import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Products = () => {

    const [pdata, setpData] = useState([]);
    const Navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        var getData = await axios.get('http://localhost:5000/products', {
            headers: {
                "Content-Type": "application/json",
                "authorization": JSON.parse(localStorage.getItem('token'))
            }
        })
        console.log(getData.data);
        if (getData.status != 200) {
            Navigate("/login")
        }
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

                        </tr>
                        {
                            pdata?.map((value, i) => (
                                <tr className="tableRow">
                                    {console.log(value)}

                                    <td className="tableRow">{i + 1}</td>
                                    <td className="tableRow">{value.name}</td>
                                    <td className="tableRow">{value.brand}</td>
                                    <td className="tableRow">{value.price}</td>
                                </tr>
                            ))

                        }
                    </table>
                </>) : <div><h4>No products added</h4></div>
            }
        </div>

    )
}

export default Products;