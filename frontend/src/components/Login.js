import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = ({ setAuth }) => {

    const [email, setEmail] = useState("")
    const [password, setPwd] = useState("")
    const Navigate = useNavigate();
    const [error, setError] = useState(null)

    useEffect(() => {
        let auth = localStorage.getItem('user')
        console.log(auth)
        if (auth) {
            Navigate('/add')
        }
    }, [])
    const handleClick = () => {

        setEmail("")
        setPwd("")

        const postData = async () => {
            try {
                let post = await axios.post('http://localhost:5000/users/login', { email, password })
                post = post.data
                localStorage.setItem('user', JSON.stringify(post?.user))
                localStorage.setItem('token', JSON.stringify(post?.token))
                setAuth(post?.user)
                Navigate('/add')
            }
            catch (error) {
                setError(error.response.data)
            }
        }
        postData();
    }
    return (
        <div className="main">

            <h4>Login Here</h4>

            <input type="text" onChange={(e) => (setEmail(e.target.value))} 
             placeholder="Enter your email" value={email} className="subclass" />

            <input type="password" onChange={(e) => (setPwd(e.target.value))}
             placeholder="Enter password" value={password} className="subclass" />

            <button type="button" onClick={handleClick} className="btn">Login</button>

            {error && <h6 style={{ color: "red" }}>{error}</h6>}
        </div>
    )
}
export default Login;