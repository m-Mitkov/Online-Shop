const { Router } = require('express');


const authController = require('./controllers/auth');
const productController = require('./controllers/product');

const authCheck = require('./middlewares/authCheck'); 

const router = Router();

router.use('/auth', authController);
router.use('/product', authCheck, productController); // add middleware isAuth && hasPermisions

module.exports = router;