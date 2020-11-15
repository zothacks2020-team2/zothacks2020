import "./songCard.scss";
import React from "react";
//import {NavLink} from "react-router-dom";

function SongCard({data}) {
    // use data.image for src
    return (
        <a className="song-card" href={data.url}>
            <img src="data:image/png;base64,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" alt={"album cover for " + data.song} className="album-cover">
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