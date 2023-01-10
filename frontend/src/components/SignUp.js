import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = ({ setAuth, auth }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPwd] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            navigate('/')
        }
    }, [auth]);

    const handleClick = () => {
        setName("")
        setEmail("")
        setPwd("")
        const sendData = async () => {
            try {
                let post = await axios.post('http://localhost:5000/users/signup', 
                { name, email, password })
                var res = post.data;
                localStorage.setItem('user', JSON.stringify(res?.user));
                localStorage.setItem('token', JSON.stringify(res?.token));
                setAuth(res.user)
            }
            catch (error) {
                setError(error.response.data)
            }
        }
        sendData();
    }

    return (

        <div className="main">
            <h3>Register Here</h3>
            <input type="text" onChange={(e) => (setName(e.target.value))} 
            placeholder="Enter your name" value={name} className="subclass" />

            <input type="text" onChange={(e) => (setEmail(e.target.value))} 
            placeholder="Enter your email" value={email} className="subclass" />

            <input type="password" onChange={(e) => (setPwd(e.target.value))} 
            placeholder="Enter password" value={password} className="subclass" />

            {error && <h6 style={{ color: 'red' }}>{error}</h6>}

            <button type="button" onClick={handleClick} className="btn">SignUp</button>
        </div>
    )
}

export default SignUp;