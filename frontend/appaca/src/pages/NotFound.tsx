import React from "react";
import "./LoginPage.css"

function FAQ() {
    return (
        <div>
            <p><h1>What is Appaca?</h1></p>
            <p style={{ fontFamily: 'National Park, sans-serif' }}>
                Appaca is a service designed for the directors of the University of Maryland Application Development Club to facilitate
                matching mentors to students based on common interests and increase mentor/student engagement with fun games and activities.
            </p>
            <p><h1>How do I use it?</h1></p>
            <p style={{ fontFamily: 'National Park, sans-serif' }}>
                Create an account as a director and have your students and mentors sign up as their respective roles. Once everyone is in,
                the director has the option to begin matching based on the criteria that the students and mentors selected. After a completed
                match, the mentor groups now have the ability to play Two Truths, One Bug with one another. Try it out!
            </p>
            <p><h1>What's with the Alpaca?</h1></p>
            <p style={{ fontFamily: 'National Park, sans-serif' }}>
                When developing an identifiable mascot, it is important to make him fun and relatable. With his smart glasses and dedication
                to app development, Appaca is the mascot of his namesake!
            </p>
            <p><h1>What's your tech stack?</h1></p>
            <p style={{ fontFamily: 'National Park, sans-serif' }}>
                The tech stack for Appaca is React-Typescript for frontend matters and the backend is Python FastAPI and MongoDB.</p>
        </div>
    )
}

export default FAQ;