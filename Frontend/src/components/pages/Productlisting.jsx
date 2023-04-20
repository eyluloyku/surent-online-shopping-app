import React from 'react'
import Footer from '../Footer'
import ListProds from '../listProds'
import "./Productlisting.css";

export default function Productlisting() {
  return (
    <div className='listed-prods'>
        <ListProds></ListProds>
        <div className='footer'>
          <Footer></Footer>
        </div>
    </div>
  )
}
