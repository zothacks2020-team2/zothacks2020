import React, { useState, useEffect } from "react";
import axios from "axios";
import "./songList.scss";

// import axios from "axios"

import SongCard from "./songCard";

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