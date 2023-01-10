import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = ({ auth }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("")
    const [brand, setBrand] = useState("")
    // const [userId, setuserId] = useState("")
    const Navigate = useNavigate()

    const handleClick = () => {

        let usid = localStorage.getItem('user')

        const postData = async () => {
            var result = await axios.post('http://localhost:5000/products', { name, price, brand }, {
                headers: {
                    'Content-Type': 'Application/JSON',
                    authorization: JSON.parse(localStorage.getItem('token'))
                }
            })
            console.log(result)
        }
        postData();
        setName("");
        setBrand("");
        setPrice("")
    }
    return (
        <div className="main">
            <h3>Add Here</h3>
            <input type="text" onChange={(e) => (setName(e.target.value))} placeholder="Enter product name" value={name} className="subclass" />
            <input type="text" onChange={(e) => (setPrice(e.target.value))} placeholder="Enter price" value={price} className="subclass" />
            <input type="text" onChange={(e) => (setBrand(e.target.value))} placeholder="Enter brand" value={brand} className="subclass" />
            <button type="button" onClick={handleClick} className="btn">Add Product</button>
        </div>
    )

}
export default Add