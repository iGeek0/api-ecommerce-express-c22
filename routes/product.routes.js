const { Router } = require('express');
const { productsGet, productsPost } = require('../controllers/product.controller');
const router = Router();


router.get('/products', productsGet);

router.post('/products', productsPost);

module.exports = router;