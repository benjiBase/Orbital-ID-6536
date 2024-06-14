import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Homepage.css";


export default function Homepage({ setAut }) {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();

            setName(parseRes.user_name);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getName();
    }, []);

    return (
        <>
            <h1>Homepage</h1>
            <div className="container">
                <div className="sidebar">
                    <div className="list-group">
                        <Link to="/homepage/coursetracker" className="list-group-item list-group-item-action">
                            Course Tracker
                        </Link>
                        <Link to="/homepage/suggestedroadmap" className="list-group-item list-group-item-action">
                            Suggested Roadmap
                        </Link>
                        <Link to="/homepage/usefullinks" className="list-group-item list-group-item-action">
                            Useful Links
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
