import { fromJS, merge } from 'immutable';
import {
    SELECT_PRODUCT,
    DESELECT_PRODUCT
} from '../../actions/actionTypes';

export const SUCCESS = 'success';
export const ERROR = 'error';

const productReducer = (state, action) => {
    const { type, payload } = { ...action };

    switch (type) {
        case SELECT_PRODUCT: {
            const stateJS = state.toJS();
            const selectedProduct = payload.product;

            return stateJS._id === selectedProduct._id
                ? state.setIn([], fromJS({
                    name: '',
                    price: '',
                    currency: '',
                    _id: ''
                }))
                : state.setIn([], fromJS(payload.product));
        } 
        case DESELECT_PRODUCT:
            return state.setIn([], fromJS({
                name: '',
                price: '',
                currency: '',
                _id: ''
            }));
        default: return state;
    }
};

export {
    productReducer
};