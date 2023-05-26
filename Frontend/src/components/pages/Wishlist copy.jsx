import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import WishlistCard from "../WishlistCard";

const Wishlist = ({setWishlistData}) => {
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [prods, setProds] = useState([]);
    

    const fetchWL = async () => {
        setLoading(true);

        let {userId, token} = localStorage;

        if (!userId) {
            const randomUserId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('userId', randomUserId);
            userId = randomUserId;
        }
        const config = {
            headers: {
                'x-access-token': token,
                'userId': userId
            }
        };

        try {
            axios
            .get("http://localhost:8080/api/wishlists/"+userId, config)
            .then((response) =>
                {
                setWishlist(response.data);
                localStorage.setItem("wishlistId", response.data._id)
                setLoading(false)
                //setWishlistData(response.data)
                response.data.products.forEach(product => {
                    axios.get('http://localhost:8080/api/products/prodID/'+product.productId).then(res=>{
                        
                        prods.push(res.data)
                        
                    }).catch(error=>{
                        console.log(error,);
                    });
                })
                }
                )
        } catch (error) {
            setLoading(false);
        }
        
    };

    useEffect(() => {
        fetchWL();
       
    }, []);
    
    /*useEffect(() => {
        wishlist.products.forEach(product => {
            axios.get('http://localhost:8080/api/products/prodID/'+product.productId).then(response=>{
                data.push(response);
              }).catch(error=>{
                console.log(error,);
              });
        });
    }); */

    

    if (loading) {
        return <p>Loading wishlist...</p>;
    }


    return (
        <div>
            <div className="container">
                <ul className='columnList'>
                    
                  {prods.length > 0 ? (prods.map(item=>(
                    <li key={item._id}><WishlistCard item={item} ></WishlistCard></li>
                  ))): 
                  (<h4>Your wishlist is empty.</h4>)
                  }
                </ul>
            </div>
        </div>
      )

}

export default Wishlist;
