const { Router } = require('express');


const authController = require('./controllers/auth');
const productController = require('./controllers/product');

const router = Router();

router.use('/auth', authController);
router.use('/product', productController); // add middleware isAuth && hasPermisions

module.exports = router;