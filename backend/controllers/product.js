const { Router } = require('express');
const productService = require('../services/product');

const router = Router();

router.post('/', async (req, res) => {
    try {
        const product = await productService.createProduct(req.body, res.locals);
        res.status(201).json({
            status: 'success',
            message: 'Product successfully created!',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Creation of product was not successfull!'
        })
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await productService.getAll(res.locals);
        res.status(200).json({
            status: 'success',
            message: 'Product succesfully retrieved',
            data: products
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Could not retireve any data'
        })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await productService.getById(req.params.id, res.locals);
        res.status(200).json({
            status: 'success',
            message: 'Product found',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Product not found'
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const product = await productService.update(req.params.id, req.body, res.locals);
        res.status(200).json({
            status: 'success',
            message: 'Product successfully updated!',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Update of product was not successfull'
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id, res.locals);
        res.status(200).json({
            status: 'success',
            message: 'Product successfully deleted!'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Delete of product was not successfull'
        })
    }
});


module.exports = router;