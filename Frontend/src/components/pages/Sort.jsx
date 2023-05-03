import React, { useState } from 'react'
import Footer from '../Footer'
import ListSortProds from '../listSortProducts'
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

        <div className='productsContainer'>
          <form onSubmit={handleSubmit} className='search-bar' >
            <input 
            type='text' 
            placeholder='search anything'
            value={searchValue}
            onChange={handleSearchValueChange}>

            </input>
            <button type='submit'><img src="/icons/search.png" alt="." /></button>
          </form>
          
          <div className="sort">
            <h6 className='sorttext'>Sort by</h6>
            <form className='sort-bar'>
              <select id='sorting' className='sort-option'>
                <option value="/sort/price">Price</option>
                <option value="/sort/rating">Rating</option>
              </select>
              <button type='submit' onClick={(e) => {
                e.preventDefault(); 
                const selectedValue = document.getElementById('sorting').value; // Get the value of the selected option
                window.location.href = selectedValue;

              }}>
                <img src="/icons/check-box.png" alt="." />
              </button>
            </form>
          </div>


        </div>



        <ListSortProds></ListSortProds>
        <div className='footer'>
          <Footer></Footer>
        </div>
    </div>
  )
}