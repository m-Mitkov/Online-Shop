import immutable, { fromJS } from 'immutable';
import { createContext, useReducer, useState } from 'react';

import { authReducer } from '../reducers/authReducer';
import { notificationReducer } from '../reducers/notifiationReducer';
import { productReducer } from '../reducers/productReducer';

export const Context = createContext();

export const Store = (props) => {

    const authObject = fromJS({
            username: '',
            permissions: [],
            _id: '',
            'x-auth-token': ''
    });
    const notificationObj = fromJS({
        active: false,
        type: '',
        message: ''
    });
    const productObj = fromJS({
        product: {
            name: '',
            price: '',
            currency: '',
            _id: ''
        },
        products: []
    });

    const [auth, authDispatch] = useReducer(authReducer, authObject);
    const [notify, notifyDispatch] = useReducer(notificationReducer, notificationObj);
    const [product, productDispatch] = useReducer(productReducer, productObj);
    
    return (
        <Context.Provider value={{
            auth: [auth, authDispatch],
            notification: [notify, notifyDispatch],
            product: [product, productDispatch]
        }}>

            {props.children}

        </Context.Provider>
    );
};