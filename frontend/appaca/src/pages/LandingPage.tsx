import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
// import video from './Images/testVideo.mp4';
import animation from "./Images/alpacaAnimation3.png";

function LandingPage() {

    return (
        <div>
            <svg className="bokeh" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10%" cy="85%" r="10%"/>
                <circle cx="45%" cy="50%" r="10%"/>
                <circle cx="85%" cy="35%" r="15%"/>
                <circle cx="60%" cy="85%" r="15%"/>
                <circle cx="45%" cy="50%" r="10%"/>
                <circle cx="35%" cy="25%" r="10%"/>
                <circle cx="90%" cy="-25%" r="15%"/>
                <circle cx="-15%" cy="30%" r="15%"/>
                <circle cx="65%" cy="85%" r="10%"/>
                <circle cx="45%" cy="50%" r="10%"/>
            </svg>

            <div className = "title">
                <h1>🦙 Appaca! 🦙</h1>
            </div>
            
            {/* <div className = "video">
                <video id="myVideo" autoPlay muted playsInline height="400px">
                    <source src={video} type="video/mp4" />
                </video>
            </div> */}


            {/* <img src={animation} className="animation"/> */}
            <img
                key={Date.now()} // force new image render
                src={`${animation}?v=${Date.now()}`} // cache busting
                alt="animation"
                className="animation"
            />

            <div className = "content-container">
                <div className="fade-in">
                <div className="main-content">
                    <p>Get ready to meet your mentor!</p>
                </div>

                <Link to="/login">
                    <button className="ahhhh" role="button">
                    <span className="button-shadow"></span>
                    <span className="button-edge"></span>
                    <span className="button-side-edge"></span>
                    <span className="button-front text">
                        Login
                    </span>
                    </button>
                </Link>

                <Link to="/signup">
                    <button className="ahhhh" role="button">
                    <span className="button-shadow"></span>
                    <span className="button-edge"></span>
                    <span className="button-side-edge"></span>
                    <span className="button-front text">
                        Register
                    </span>
                    </button>
                </Link>

                <Link to="/faq">
                    <button className="ahhhh" role="button">
                    <span className="button-shadow"></span>
                    <span className="button-edge"></span>
                    <span className="button-side-edge"></span>
                    <span className="button-front text">
                       Frequently Asked Questions 
                    </span>
                    </button>
                </Link>

                

                </div>

            </div>

        </div>
    )
}

export default LandingPage;