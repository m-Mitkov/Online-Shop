import { fromJS, merge, updateIn } from 'immutable';
import {
    FETCH_PRODUCTS,
    SELECT_PRODUCT,
    UPDATE_PRODUCTS_IN_STORE,
    UPDATE_PRODUCT_IN_STORE,
    DELETE_PRODUCT,
    EDIT_FIELD // TODO implement if you have time,
              // do not use State, use context to keep product data up to date
} from '../../actions/actionTypes';

export const SUCCESS = 'success';
export const ERROR = 'error';

const productReducer = (state, action) => {
    const { type, payload } = { ...action };

    switch (type) {
        case SELECT_PRODUCT: {
            const stateJS = state.toJS();
            const selectedProduct = payload.product;

            if (stateJS.product._id === selectedProduct._id) {
                return state.setIn(['product'], fromJS({
                    name: '',
                    price: '',
                    currency: '',
                    _id: ''
                })); // case when clicked again on same row
            } else {
                return state.setIn(['product'], fromJS(payload.product));
            }
        }
        case FETCH_PRODUCTS: {
            return state.setIn(['products'], fromJS(payload.data));
        }
        case UPDATE_PRODUCTS_IN_STORE : {
            return state.setIn(['products'], fromJS(
                merge(state.getIn(['products']), payload.data)
            ));
        }
        case UPDATE_PRODUCT_IN_STORE : {
            const { idProductToUpdate = '', data = {} } = payload;
            const productsToJS = state.getIn(['products']).toJS();
            const indexProductToUpdate = productsToJS.findIndex(curr => {
                return curr._id === idProductToUpdate
            });
            productsToJS[indexProductToUpdate] = data;
                return state.setIn(['products'],fromJS(productsToJS));
        }
        case DELETE_PRODUCT : {
            const { idProductToDelete = ''} = payload;
            const productsToJS = state.getIn(['products']).toJS();
            const newProducts = productsToJS.filter(curr => {
                return curr._id !== idProductToDelete
            });
            return state.setIn(['products'],fromJS(newProducts));
        }
        default: return state;
    }
};

export {
    productReducer
};