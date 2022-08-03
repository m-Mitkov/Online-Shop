import {
    SELECT_PRODUCT,
    DESELECT_PRODUCT
} from './actionTypes';

export const selectProduct = (notifyDispatch, data) => {
    notifyDispatch({type: SELECT_PRODUCT, payload: { product: data }});
};

export const deselectProduct = (notifyDispatch, data) => {
    notifyDispatch({type: DESELECT_PRODUCT, payload: { product: data }});
};
