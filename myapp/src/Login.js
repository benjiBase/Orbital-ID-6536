import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function Login({setAut}) {

    const[inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const {email, password} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/auth/login", 
            {
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email, password
                })
            })
            const parseRes = await response.json();
            //console.log(parseRes);
            localStorage.setItem("token", parseRes.token);
            setAut(true);


        } catch (err) {
            console.error(err.message);
        
        }
    }
    return(
        <>
        <h1 className="text-center my-5">Login</h1>
        <form onSubmit={onSubmitForm}>
            <input 
                type="email" 
                name ="email"
                placeholder="enter your email"
                className="form-control my-3"
                value={email}
                onChange={e => onChange(e)}
            />
            <input
                type="password" 
                name ="password"
                placeholder="enter your password"
                className="form-control my-3"
                value={password}
                onChange={e => onChange(e)}
            />
            <button className ="btn btn-success btn-block">
                Submit</button>
        </form>
        <Link to = "/register">Register</Link>
        </>
    );
} 