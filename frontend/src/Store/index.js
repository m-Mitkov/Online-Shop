import immutable, { fromJS } from 'immutable';
import { createContext, useReducer, useState } from 'react';

import { authReducer } from '../reducers/authReducer';
import { notificationReducer } from '../reducers/notifiationReducer';

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

    const [auth, authDispatch] = useReducer(authReducer, authObject)

    const [notify, notifyDispatch] = useReducer(notificationReducer, notificationObj)
    
    return (
        <Context.Provider value={{
            auth: [auth, authDispatch],
            notification: [notify, notifyDispatch]
        }}>

            {props.children}

        </Context.Provider>
    );
}