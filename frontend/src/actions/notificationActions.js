import {
    SUCCESS_NOTIFICATION,
    ERROR_NOTIFICATION,
    TERMINATE_NOTIFICATION
} from './actionTypes';

export const successNotify = (notifyDispatch, data) => {
    notifyDispatch({type: SUCCESS_NOTIFICATION, payload: { message: data }});
};

export const errorNotify = (notifyDispatch, data) => {
    notifyDispatch({type: ERROR_NOTIFICATION, payload: { message: data }});
};

export const terminateNotify = (notifyDispatch, data) => {
    notifyDispatch({type: TERMINATE_NOTIFICATION, payload: {}});
};