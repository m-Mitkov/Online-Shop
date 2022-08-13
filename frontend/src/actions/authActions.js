import { 
    login as loginService,
    register as registerService,
    logout as logoutService
} from '../services/apiServices/auth';
import {
    successNotify,
    errorNotify
} from './notificationActions';
import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
} from './actionTypes';


const loginSuccessAction = (authDispatch, data) => 
    authDispatch({ type: LOGIN_SUCCESS, payload: data });

const logoutSuccessAction = authDispatch => 
    authDispatch({ type: LOGOUT_SUCCESS });

export const login = (authDispatch, notifyDispatch, navigate, data) => {
    loginService(data)
        .then(res => {
            const response = JSON.parse(res);
            if (response.type === 'error') throw new Error(response);

            loginSuccessAction(authDispatch, response);
            successNotify(
                notifyDispatch,
                response.message
            );
        })
        .then(() => navigate('/'))
        .catch(err => {
            errorNotify(
                notifyDispatch,
                err.message
            );
        });
};

export const register = (notifyDispatch, navigate, data) => {
    registerService(data)
        .then(res => {
            const response = JSON.parse(res);
            if (response.type === 'error') throw new Error(response);
             
            successNotify(
                notifyDispatch,
                response.message
            );
            navigate('/login');
        })
        .catch(err => {
            errorNotify(
                notifyDispatch,
                err.message
            );
        });
};

export const logout = (authDispatch, notifyDispatch, navigate, token) => {
    logoutService(token)
        .then(res => {
            const response = JSON.parse(res);
            if (response.type === 'error') throw new Error(response);
            
            logoutSuccessAction(authDispatch);
            successNotify(
                notifyDispatch,
                response.message
            );
            navigate('/login');
        })
        .catch(err => {
            errorNotify(
                notifyDispatch,
                err.message
            );
        });
};