import React,{ Fragment, useState } from "react";
import "./App.css";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Homepage from "./Homepage";
import Register from "./Register";
import Login from "./Login";
import GradTracker from "./Homepage/GradTracker";
import Roadmap from "./Homepage/Roadmap";
import UsefulLinks from "./Homepage/UsefulLink";


function App() {
  //change back to false for full trial run
  const [auth, setAuth] = useState(true);

  const setAut = (boolean) => {
    setAuth(boolean);
  };

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAut(false);
    navigate("/");
  };

  function LoginButton() {
    //const navigate = useNavigate(); 
    const handleLoginClick = () => {
      navigate("/login");
    };
  
    return (
      <button id="right" onClick={auth ? logout : handleLoginClick}>
        {/* change logic upon login */}
        {auth ? "Logout" : "Login"}
      </button>
    );
  }


  return (
    <>      
      <div className="App-header">
          <div className="left">
            <div id="start">          
              <a href="/homepage">HowToGraduate</a>          
            </div>
          </div>
          
          <LoginButton />
      </div>

        <div className = "group">
          <Routes>
            <Route path = "/login" 
              Component={props => 
                !auth ? <Login {...props} setAut={setAut}/> 
                      : <Navigate to = "/homepage/*" />}
            />

            <Route path = "/register" 
              Component={props => 
                !auth 
                  ? <Register {...props} setAut={setAut}/>
                  : <Navigate to = "/login" />}
            />
            {/* need to add /* to tell react its a nested route for this homepage */}
            <Route path = "/homepage/*" 
              Component={props => 
                  auth
                    ? <Homepage {...props} setAut={setAut}/>
                    : <Navigate to = "/login" />}
            />

            <Route path="homepage/coursetracker" element={<GradTracker />} />
            <Route path="homepage/suggestedroadmap" element={<Roadmap />} />
            <Route path="homepage/usefullinks" element={<UsefulLinks />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
