const express = require('express');
const {fetchProduct, addProduct, deleteProduct} = require("../Controller/product");
const {signup, login, verifyOtp, administrator} = require("../Controller/Auth");
const router = express.Router();
const upload = require("../config/upload");


router.get('/products', fetchProduct);


router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);




router.post(
    '/admin/diamond/add-product',
    upload.any(),
    addProduct);

router.delete('/admin/diamond/delete-product/:id',deleteProduct)
router.post('/admin/diamond/login', administrator);


module.exports = router;
