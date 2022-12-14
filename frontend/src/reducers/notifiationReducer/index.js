import { fromJS, merge } from 'immutable';
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION, TERMINATE_NOTIFICATION } from '../../actions/actionTypes';

export const SUCCESS = 'success';
export const ERROR = 'error';

const notificationReducer = (state, action) => {
    const { type, payload } = { ...action };

    switch (type) {

        case SUCCESS_NOTIFICATION:
            return state.setIn([], fromJS(merge(state, {
                active: true,
                type: SUCCESS,
                message: payload.message
            })));

        case ERROR_NOTIFICATION:
            return state.setIn([], fromJS(merge(state, {
                active: true,
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