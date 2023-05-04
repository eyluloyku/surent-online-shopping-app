import React, { useState } from 'react'
import Footer from '../Footer'
import ListSortProds from '../listSortProducts'
import "./Productlisting.css";


export default function Productlisting() {
  console.log(window.location.href)
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

  function handleCategoryClick (text) {
    window.location.href = `/category/${text}`;
  };
  window.scrollTo(0, 0);

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
          

          <div className='category-selection'>
            <button className='category-button' onClick={() => handleCategoryClick("urban")}>Urban</button>
            <button className='category-button' onClick={() => handleCategoryClick("suit")}>Suit</button>
            <button className='category-button' onClick={() => handleCategoryClick("shoes")}>Shoes</button>
            <button className='category-button' onClick={() => handleCategoryClick("pants")}>Pants</button>
            <button className='category-button' onClick={() => handleCategoryClick("dress")}>Dress</button>
            <button className='category-button' onClick={() => handleCategoryClick("t-shirt")}>T-Shirt</button>
            <button className='category-button' onClick={() => handleCategoryClick("hat")}>Hat</button>
            <button className='category-button' onClick={() => handleCategoryClick("bag")}>Bag</button>
          </div>


          <div className="sort">
            <h6 className='sorttext'>Sort by</h6>
            <form className='sort-bar'>
              <select id='sorting' className='sort-option'>
                <option value="/sort/price">Price</option>
                <option value="/sort/rating">Rating</option>
                <option value="/sort/popularity">Popularity</option>
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