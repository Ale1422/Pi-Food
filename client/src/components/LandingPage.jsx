import React from "react";
import {Link} from "react-router-dom"
import './LandingPage.css'

export default function LandingPage(){
    return(
        <div className="landing" >
            <h1>Bienvenidos PI Food</h1>
            <Link to= '/home'>
                <button>Let's Cook!!!</button>
            </Link>
        </div>
    )
}