import React, { useState } from 'react'
import Footer from '../Footer'
import ListSearchProds from '../listSearchProducts'
import "./Productlisting.css";


export default function Productlisting() {

  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchValue) {
      window.location.href = `/search/${searchValue}`;

    }
  };

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (

    <div className='listed-prods'>

        <div className='container'>
          <form onSubmit={handleSubmit} className='search-bar' >
            <input 
            type='text' 
            placeholder='search anything'
            value={searchValue}
            onChange={handleSearchValueChange}>

            </input>
            <button type='submit'><img src="/icons/search.png" alt="." /></button>
          </form>

        </div>



        <ListSearchProds></ListSearchProds>
        <div className='footer'>
          <Footer></Footer>
        </div>
    </div>
  )
}