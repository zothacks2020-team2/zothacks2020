import React, {useState} from "react";
import "./songList.scss";

// import axios from "axios"

import SongCard from "./songCard";
const listOfSongs = [
    {"artist":"Rick Astley","image":"https://open.spotify.com/embed/album/6XhjNHCyCDyyGJRM5mg40G","name":"Never Gonna Give You Up","url":"https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb?si=RWMG19I3SpeeRIaU2e2xLQ"},
    {"artist":"Rick Astley","image":"https://open.spotify.com/embed/album/6XhjNHCyCDyyGJRM5mg40G","name":"Never Gonna Give You Up","url":"https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb?si=RWMG19I3SpeeRIaU2e2xLQ"},
    {"artist":"Rick Astley","image":"https://open.spotify.com/embed/album/6XhjNHCyCDyyGJRM5mg40G","name":"Never Gonna Give You Up","url":"https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb?si=RWMG19I3SpeeRIaU2e2xLQ"}
]

function SongList() {
    // get the list of songs
    return (
        <div className="song-list flex-split">
            {listOfSongs.map((singularSong, index) => {
                return (<SongCard data={singularSong}/>);
            })}
        </div>
    );
}

export default SongList;