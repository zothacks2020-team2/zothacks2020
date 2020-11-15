import "./songCard.scss";
import React from "react";
import { motion } from "framer-motion";
//import {NavLink} from "react-router-dom";

function SongCard({data}) {
    // use data.image for src
    return (
        <motion.a 
        animate={{
            opacity: [0, 1],
        }}
        transition={{
            duration: 1.0,
            delay: 0.5
        }}
        className="song-card" href={data.url}>
            <img src={data.image} alt={"album cover for " + data.song} className="album-cover">
            </img>
            <h3>
                {data.name}
            </h3> 
            <h4>
                {data.artist}
            </h4>
        </motion.a>
    )
}

export default SongCard;