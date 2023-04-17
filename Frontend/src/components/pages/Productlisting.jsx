import React, {useState,useEffect} from 'react'
import axios from "axios";

function Productlisting() {

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
            <ul>
              {data.map(item=>(
                <li key={item._id}>{item.Pname}</li>
              ))}
            </ul>
        </div>
    </div>
  )
}

export default Productlisting