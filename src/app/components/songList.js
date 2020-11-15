import React, { useState, useEffect } from "react";
import axios from "axios";
import "./songList.scss";

// import axios from "axios"

import SongCard from "./songCard";
// const listOfSongs = [
//     {"artist":"Rick Astley","image":"https://open.spotify.com/embed/album/6XhjNHCyCDyyGJRM5mg40G","name":"Never Gonna Give You Up","url":"https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb?si=RWMG19I3SpeeRIaU2e2xLQ"},
//     {"artist":"Rick Astley","image":"https://open.spotify.com/embed/album/6XhjNHCyCDyyGJRM5mg40G","name":"Never Gonna Give You Up","url":"https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb?si=RWMG19I3SpeeRIaU2e2xLQ"},
//     {"artist":"Rick Astley","image":"https://open.spotify.com/embed/album/6XhjNHCyCDyyGJRM5mg40G","name":"Never Gonna Give You Up","url":"https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb?si=RWMG19I3SpeeRIaU2e2xLQ"}
// ]

function SongList(props) {
    const [songList, setSongList] = useState([])


    async function getSongList() {
        let songs = await axios.get(`https://zothacks2020.herokuapp.com/recommendations?task=${props.task}`);

        // If we get a valid response, set the state object, or print an error.
        if (songs.status === 200) {
            console.log(songs.data)
            setSongList(songs.data);
        } else {
            console.log("Error retrieving recommendations");
        }
    }

    useEffect(() => {
        getSongList();
    }, [])

    // get the list of songs
    return (
        <div className="song-list flex-split">
            {songList.map((singularSong, index) => {
                return (<SongCard data={singularSong} />);
            })}
        </div>
    );
}

export default SongList;