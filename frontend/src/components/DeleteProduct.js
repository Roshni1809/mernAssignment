import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const DeleteProduct = () => {

    const [pdata, setpData] = useState([]);
    const [deleteItemList, setItem] = useState([])
    const Navigate=useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const CkeckBoxList = (id) => {
        console.log(deleteItemList)
        let list = [...deleteItemList]
        const index = list.indexOf(id)
        if(index > -1) {
            list.splice(index,1)
            setItem(list)
        }
        else {
            setItem([...deleteItemList, id])
        }
    }

    const fetchData = async () => {
        var getData = await axios.get('http://localhost:5000/products', {
            headers: {
                "Content-Type": "application/json",
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        if(getData.status != 200) {
            Navigate("/login")
        }
        setpData(getData.data);
    }

    const selectAll = (e) => {
        if(e.target.checked) {
            const list = pdata?.map( p => p._id)
            setItem(list)
        }
            
        else {
            setItem([])
        }
    }

    const onDeletePress = async () => {
        var getData = await axios.delete('http://localhost:5000/products', {
            data : {
                ids : deleteItemList
                },
            headers: {
                "Content-Type": "application/json",
                authorization: JSON.parse(localStorage.getItem('token'))
            },
        })
        if(getData.status != 200) {
            Navigate("/login")
        }
        setItem([])
        setpData(getData.data);
    }

    return (
        <div className="main">
            {pdata?.length > 0
                ? (<>
                    <h4>list of the products</h4>
                    <table className="table">
                        <tr className="tableRow">
                            <th className="tableRow">
                                S.No
                            </th>
                            <th className="tableRow">
                                Product
                            </th>
                            <th className="tableRow">
                                Brand
                            </th>
                            <th className="tableRow">
                                Price
                            </th>
                            <th className="tableRow">
                                Select
                                <input
                                    type="checkbox"
                                    onChange={selectAll}
                                />
                            </th>
                        </tr>
                        {
                            pdata?.map((value, i) => (
                                <tr key= {i} className="tableRow">
                                    <td className="tableRow">{i + 1}</td>
                                    <td className="tableRow">{value.name}</td>
                                    <td className="tableRow">{value.brand}</td>
                                    <td className="tableRow">{value.price}</td>
                                    <td className="tableRow">
                                    <input
                                        type="checkbox"
                                        id={i}
                                        checked = {deleteItemList.includes(value._id)}
                                        onChange={() => CkeckBoxList(value._id)}
                                    />

                                    </td>
                                </tr>
                            ))

                        }
                    </table>
                    <button onClick={() => onDeletePress()} className="btn">Delete</button>
                </>) : <div><h4>No products added</h4></div>
            }
        </div>

    )
}

export default DeleteProduct;