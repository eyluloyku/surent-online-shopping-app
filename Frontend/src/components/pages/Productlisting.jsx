import Footer from '../Footer'
import ListProds from '../listProds'
import ProductListingNavbar from '../search-category-sort'
import "./Productlisting.css"


export default function Productlisting() {

 

  const handleGraphSubmit = (event) => {
    event.preventDefault(); // Prevent the form from being submitted normally

    // Get the start and end date values
    const startDate = document.getElementById('start').value;
    const endDate = document.getElementById('end').value;
    console.log("asdadada");
    // Redirect to the desired page with the date values in the URL
    window.location.href = '/revenue/' + startDate + '/' + endDate;
  }





  return (

    <div className='listed-prods'>

        <ProductListingNavbar></ProductListingNavbar>

        <ListProds></ListProds>
        <div className='footer'>
          <Footer></Footer>
        </div>




        <form id="dateForm" onSubmit={handleGraphSubmit}>
          <label for="start">Start Date:</label>
          <input type="date" id="start" name="start" />

          <label for="end">End Date:</label>
          <input type="date" id="end" name="end" />

          <button type="submit">Submit</button>
        </form>




    </div>
  )
}