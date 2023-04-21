import * as React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Carousel from 'react-material-ui-carousel';
import Item from '../Items';
import Footer from '../Footer'

//sx={{ display: { xl: 'none', xs: 'block' } }}


export default function ProductsDetail() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [items, setItems] = useState([]); //for carousel 

    useEffect(() => {
        if (!id){
            return;
        }
        axios.get('http://localhost:8080/api/products/prodID/'+id).then(response => {
            setProduct(response.data);
            //console.log(response.data);
        });
    }, [id]);

    //FOR RANDOM IMAGES, WILL DELETE 
    useEffect(() => {
        fetch('https://picsum.photos/v2/list?page=5&limit=10')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            });
    }, []);

    if (!product) {
        return 'cannot fetch from database';
    }

    //HAS INTERNAL CSS, COME BACK!!!
    return(
        <div className="product-details">
            <Grid container 
                p={10}
                direction="row"
                alignItems="center"
                justifyContent="center">
                <Grid item xs={6}> 
                    <Box> 
                        <Carousel>
                            {items.map( item => (
                                <Item key={item.id} item={item} />
                            ))}
                        </Carousel>
                    </Box>
                </Grid>
                <Grid item xs={6}> 
                    <Box p={2}> 
                        <Typography variant="h2" color={'#242424'}>{product.Pname}</Typography>
                    </Box>
                    <Box p={2}> 
                        <Typography variant="h6" color={'#242424'}>{product.description}</Typography>
                    </Box>
                    <Box p={2}> 
                        <Grid container>
                            <Grid item p={1}>
                                <Typography variant="h4" color={'#242424'}>${product.price}</Typography>
                            </Grid>
                            <Grid item p={1}>
                                <Typography variant="h6" color={"primary.light"}>%{product.Discount_rate} off!</Typography>
                            </Grid>
                        </Grid>
                        
                    </Box>
                    <Box p={2}>
                        <Button variant="contained" startIcon={<AddShoppingCartIcon />}>Add to Cart</Button>
                    </Box>
                    
                </Grid>
            </Grid>

            <div className='footer'>
                <Footer></Footer>
            </div>

        </div>
 

        
    );
}