import { fromJS, merge } from 'immutable';
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION, TERMINATE_NOTIFICATION,
    SUCCESS_CREATE_ANNOUNCEMENT } from '../../actions/actionTypes';
// import { SUCCESS, ERROR } from '../enums/typeNotifications';

export const SUCCESS = 'success';
export const ERROR = 'error';

const notificationReducer = (state, action) => {
    const { type, payload } = { ...action };

    switch (type) {

        case SUCCESS_NOTIFICATION:
            return state.setIn([], fromJS(merge(state, {
                active: !state.active,
                type: SUCCESS,
                message: payload.message
            })));

        case ERROR_NOTIFICATION:
            return state.setIn([], fromJS(merge(state, {
                active: !state.active,
                type: ERROR,
                message: payload.message
            })));

        case TERMINATE_NOTIFICATION:
            return state.setIn([], fromJS(merge(state, {
                active: false,
                type: '',
                message: ''
            })));

        default: return state;
    }
};

export {
    notificationReducer
};