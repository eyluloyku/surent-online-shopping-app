import Router from "express";
import auth from "../middleware/auth.js";
//import productController from "../controllers/productController.js";
import cors from 'cors';
import {
    createProd,
    getAllProds,
    getProductById,
    getProductByName,
    getProductByCategory,
    deleteProduct,
    updateProduct,
    createProductReview,
    getProductReviews,
    sortByPriceDescending,
    sortByRatingDescending,
    sortByPopularityDescending
} from "../controllers/productController.js"

const router = Router();

router.get('/getAll', getAllProds)
router.post('/add',createProd);

router.get('/prodID/:id',getProductById)

router.get('/prodName/:name',getProductByName)

router.get('/prodCategory/:category',getProductByCategory)



router.delete('/rem/:id',deleteProduct)

router.patch('/update/:id',updateProduct)

router.post('/postReview/:id', auth, createProductReview);

router.get('/getReview/:id', getProductReviews);

router.get('/sort/price', sortByPriceDescending)
router.get('/sort/rating', sortByRatingDescending)
router.get('/sort/popularity', sortByPopularityDescending)

export {router};