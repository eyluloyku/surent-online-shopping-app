import React, {useState,useEffect} from 'react'
import axios from "axios";
import ProductCard from "./ProductCard";
import "./listprods.css"

function ListProds() {

    //data is initially an empty list
    const [data,setData] = useState([]); 

    useEffect(()=>{
      axios.get('http://localhost:8080/api/products/getAll').then(response=>{
        setData(response.data);
      }).catch(error=>{
        console.log(error,);
      });
    },[]);

  return (
    <div>
        <div className="container">
            <ul className='columnList'>
              {data.map(item=>(
                <li key={item._id}><ProductCard item={item} ></ProductCard></li>
              ))}
            </ul>
        </div>
    </div>
  )
}

export default ListProds