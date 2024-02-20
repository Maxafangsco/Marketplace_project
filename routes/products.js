const express = require("express");
const router = express.Router();

const { getAllProducts,
     getProductById, 
     addProduct,
      updateProductById, 
      deleteProductById,
       deleteAllProduct, 
       queryString } = require('../controllers/productControllers');

//router.get('/api/products/', getAllProducts);
router.get('/api/products/:id',getProductById)
router.post('/api/products/',addProduct)
router.put('/api/products/:id',updateProductById)
router.delete('/api/products/:id', deleteProductById)
router.delete('/api/products/', deleteAllProduct)
router.get('/api/products/',queryString)


module.exports = router;
