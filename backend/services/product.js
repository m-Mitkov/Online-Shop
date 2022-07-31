const Product = require('../models/product');

const getPermisions = resLocals => {
    const { user: userToken } = resLocals || {};
    const { permissions = [] } = userToken;
    return permissions;
}

async function createProduct(reqData, resLocals) {

    const { name, price, currency } = reqData || {};
    const permissions = getPermisions(resLocals);
    
    const isAllowed = permissions.some(per => per === 'CREATE');

    if(!isAllowed)  throw JSON.stringify(({
        type: 'error',
        message: 'Pemission denied(create product)'
    }));

    const productObj = { name, price, currency };
    const product = new Product(productObj);

    await product.save();
    return product;
};

async function getById(id, resLocals) {
    const permissions = getPermisions(resLocals);
    const isAllowed = permissions.some(per => per === 'READ');

    if(!isAllowed)  throw JSON.stringify(({
        type: 'error',
        message: 'Pemission denied(read product)'
    }));

    return await Product.findById(id);
};

async function update(productId, data, resLocals) {
    const permissions = getPermisions(resLocals);
    const isAllowed = permissions.some(per => per === 'UPDATE');

    if(!isAllowed)  throw JSON.stringify(({
        type: 'error',
        message: 'Pemission denied(update product)'
    }));

    await Product.findByIdAndUpdate(productId, {...data});
    return await Product.findById(productId);
};

async function deleteProduct(idProduct, resLocals) {
    const permissions = getPermisions(resLocals);
    const isAllowed = permissions.some(per => per === 'DELETE');

    if(!isAllowed)  throw JSON.stringify(({
        type: 'error',
        message: 'Pemission denied(delete product)'
    }));

    return await Product.findByIdAndDelete(idProduct);
};

async function getAll(resLocals) {
    const permissions = getPermisions(resLocals);
    const isAllowed = permissions.some(per => per === 'READ');

    if(!isAllowed)  throw JSON.stringify(({
        type: 'error',
        message: 'Pemission denied(read product)'
    }));

    return await Product.find({}).lean();
}

module.exports = {
    createProduct,
    getById,
    update,
    deleteProduct,
    getAll
};