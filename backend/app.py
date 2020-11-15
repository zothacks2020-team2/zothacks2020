import os
import util
import db
from flask import Flask, json, request
from flask_cors import CORS
from flask_restful import Api
from dotenv import load_dotenv
from resources.user import User
from spotifydatafetcher import SpotifyDataFetcher

# Load Environment variables
load_dotenv()

app = Flask(__name__)
# Allow cross domain apps to access API
CORS(app)

# Provide Mongo Atlas URI, stored in config file
app.config["MONGO_URI"] = os.getenv("MONGO_URI_MASTER")
# Set custom JSON Encoder for Mongo Object
app.json_encoder = util.MongoEncoder
db.mongo.init_app(app)
api = Api(app)

api.add_resource(User, "/user")

# Vanilla Flask route
@app.route("/", methods=["GET"])
def index():
    return "Welcome to our ZotHacks 2020 project!"

# Route to get song recommendations. Expects ?task=[task] in params
@app.route("/recommendations", methods=["GET"])
def recommendations():
    print(request.args.get('task'))
    recommendations = SpotifyDataFetcher().get_song_recommendations(request.args.get('task'))
    return json.jsonify(recommendations)

# Handles validation errors and returns JSON Object
@app.errorhandler(422)
@app.errorhandler(400)
def handle_error(err):
    messages = err.data.get("messages", ["Invalid request."])
    return json.jsonify({"errors": messages}), err.code


if __name__ == "__main__":
    app.run(debug=True)
