import spotipy
import random
from spotipy.oauth2 import SpotifyClientCredentials

auth_manager = SpotifyClientCredentials(
    client_id="4a1f0d78ee9445bd9c4aeec7db23e97f", client_secret="83d982a8205641a58dccdea791bb3ab9")
sp = spotipy.Spotify(auth_manager=auth_manager)


class SpotifyDataFetcher():
    def __init__(self, num_recs=5):
        # The number of song recommendations to generate
        self.num_recs = num_recs

        self.spclient = None
        # The category of songs that should be fetched
        self.category = None
        self.playlist_id = None
        self.playlist_track_ids = None

    def get_song_recommendations(self, task: str) -> dict:
        category = self.__infer_task_category(task)
        self.category = category
        return self.__run_pipeline()

    def __run_pipeline(self):
        self.__authenticate()
        self.__select_category_playlist()
        self.__select_playlist_tracks()
        return self.__package_selected_tracks()

    def __authenticate(self):
        auth_manager = SpotifyClientCredentials(
            client_id="4a1f0d78ee9445bd9c4aeec7db23e97f", client_secret="83d982a8205641a58dccdea791bb3ab9")
        self.spclient = spotipy.Spotify(auth_manager=auth_manager)

    def __select_category_playlist(self) -> str:
        playlists = self.spclient.category_playlists(
            self.category, country='US', limit=50)['playlists']['items']
        # for playlist in playlists:
        #     print(playlist['id'])
        #     print(playlist['name'])
        self.playlist_id = random.sample(playlists, 1)[0]['id']

    def __select_playlist_tracks(self) -> list:
        playlist_tracks = self.spclient.playlist_items(
            self.playlist_id, limit=100)['items']
        # print(self.spclient.playlist_items(self.playlist_id, limit=100))
        selected = [track['track']['id']
                    for track in random.sample(playlist_tracks, self.num_recs)]
        self.playlist_track_ids = selected
        # print(selected)

    def __package_selected_tracks(self) -> dict:
        all_tracks = []
        for track_id in self.playlist_track_ids:
            try:
                track = self.spclient.track(track_id)
                name = track['name']
                artist = track['album']['artists'][0]['name']
                image = track['album']['images'][0]['url']
                url = track['external_urls']['spotify']
                all_tracks.append(
                    {'name': name, 'artist': artist, 'image': image, 'url': url})
            except Exception:
                all_tracks.append(
                    {'name': None, 'artist': None, 'image': None, 'url': None})
        return all_tracks

    def __infer_task_category(self, task: str):
        return(task)
