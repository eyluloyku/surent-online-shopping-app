import Router from "express";
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
} from "../controllers/productController.js"

const router = Router();

router.get('/getAll', getAllProds)

router.get('/prodID/:id',getProductById)

router.get('/prodName/:name',getProductByName)

router.get('/prodCategory/:category',getProductByCategory)

router.post('/add',createProd);

router.delete('/rem/:id',deleteProduct)

router.patch('/update/:id',updateProduct)

export {router};