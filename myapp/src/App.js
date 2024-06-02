import React,{ Fragment, useState } from "react";
import "./App.css";
import {BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Homepage from "./Homepage";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [auth, setAuth] = useState(false);

  const setAut = (boolean) => {
    setAuth(boolean);
  };

  function LoginButton() {
    const navigate = useNavigate();
  
    const handleLoginClick = () => {
      navigate("/login");
    };
  
    return (
      <button id="right" onClick={handleLoginClick}>
        Login
      </button>
    );
  }

  return (
    <>      
    <BrowserRouter>
      <div className="App-header">
          <div className="left">
            <div id="start">
              HowToGraduate
            </div>
          </div>
          
          <LoginButton />
      </div>

        <div className = "group">
          <Routes>
            <Route path = "/login" 
              Component={props => 
                !auth ? <Login {...props} setAut={setAut}/> 
                      : <Navigate to = "/homepage" />}
            />

            <Route path = "/register" 
              Component={props => 
                !auth 
                  ? <Register {...props} setAut={setAut}/>
                  : <Navigate to = "/login" />}
            />

            <Route path = "/homepage" 
              Component={props => 
                  auth
                    ? <Homepage {...props} setAut={setAut}/>
                    : <Navigate to = "/login" />}
            />
          </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
