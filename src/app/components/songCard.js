import "./songCard.scss";
import React from "react";
//import {NavLink} from "react-router-dom";

function SongCard({data}) {
    // use data.image for src
    return (
        <a className="song-card" href={data.url}>
            <img src={data.image} alt={"album cover for " + data.song} className="album-cover">
            </img>
            <h3>
                {data.name}
            </h3> 
            <h4>
                {data.artist}
            </h4>
        </a>
    )
}

export default SongCard;