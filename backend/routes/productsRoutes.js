const express = require('express');
const productController = require("../controllers/productController")
const router = express.Router() // we will get app via this.

router.get('/getAll',productController.getAllProds)

router.get('/prodID/:id',productController.getProductById)

router.get('/prodName/:name',productController.getProductByName)

router.get('/prodCategory/:category',productController.getProductByCategory)

router.post('/add',productController.createProd);

router.delete('/rem/:id',productController.deleteProduct)

router.patch('/update/:id',productController.updateProduct)

module.exports = router;