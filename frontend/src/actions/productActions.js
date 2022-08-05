import { 
    getAll as getAllService,
    create as createService,
    update as updateService,
    deleteProduct as deleteService
} from '../services/apiServices/product';
import {
    FETCH_PRODUCTS,
    SELECT_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCTS_IN_STORE,
    UPDATE_PRODUCT_IN_STORE,
    DELETE_PRODUCT
} from './actionTypes';
import {
    successNotify,
    errorNotify
} from './notificationActions';

const fetchAllProductsDispatch = (productDispatch, data) => 
    productDispatch({ type: FETCH_PRODUCTS, payload: { data }});

const updateProductsInStore = (productDispatch, data) => {
    productDispatch({ type: UPDATE_PRODUCTS_IN_STORE, payload: { data }});
};

const updateProductInStore = (productDispatch, idProduct, data) => {
    productDispatch({ type: UPDATE_PRODUCT_IN_STORE, payload: { 
        idProductToUpdate: idProduct, data: data
     }});
};

const deleteProductInStore = (productDispatch, idProduct) => {
    productDispatch({ type: DELETE_PRODUCT, payload: { 
        idProductToDelete: idProduct
     }});
};

export const fetchProducts = (productDispatch, notifyDispatch, navigate, token) => {
    getAllService(token)
        .then(res => {
            const response = JSON.parse(res);
            if (response.type === 'error') throw new Error(response);

            fetchAllProductsDispatch(productDispatch, response.data);
        })
        .then(() => navigate('/'))
        .catch(err => {
            errorNotify(
                notifyDispatch,
                err.message
            );
        });
};

export const createProduct = (productDispatch, notifyDispatch, navigate, token, data) => {
    createService(token, data)
        .then(res => {
            const response = JSON.parse(res);
            if (response.type === 'error') throw new Error(response);

            updateProductsInStore(productDispatch, response.data);
        })
        .then(() => navigate('/'))
        .catch(err => {
            errorNotify(
                notifyDispatch,
                err.message
            );
        });
};

export const updateProduct = (productDispatch, notifyDispatch, navigate, token, data, idProduct) => {
    updateService(token, data, idProduct) 
        .then(res => {
            const response = JSON.parse(res);
            if (response.type === 'error') throw new Error(response);

            updateProductInStore(productDispatch, idProduct, data);
        })
        .then(() => navigate('/'))
        .catch(err => {
            errorNotify(
                notifyDispatch,
                err.message
            );
        });
};

export const deleteProduct = (productDispatch, notifyDispatch, navigate, token, data, idProduct) => {
    deleteService(token, idProduct) 
        .then(res => {
            const response = JSON.parse(res);
            if (response.type === 'error') throw new Error(response);

            deleteProductInStore(productDispatch, idProduct);
        })
        .then(() => navigate('/'))
        .catch(err => {
            errorNotify(
                notifyDispatch,
                err.message
            );
        });
};

export const selectProduct = (productDispatch, data) => {
    productDispatch({type: SELECT_PRODUCT, payload: { product: data }});
};

