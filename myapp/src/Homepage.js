import React, {useState, useEffect} from "react";


export default function Homepage({setAut}) {

    const [name, setName] = useState("");
        
    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token}
            })

            const parseRes = await response.json();

            setName(parseRes.user_name);
        } catch(err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getName();
    });

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAut(false);
    };

    return(   
        <>
            <h1>Homepage {name}</h1>
            <button className= "btn btn-primary"
                onClick={(e) => {logout(e)}}>
                    Logout
            </button>
        </>
    );
}