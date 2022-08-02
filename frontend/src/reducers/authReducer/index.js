import { fromJS, merge } from 'immutable';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../../actions/actionTypes';

const authReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            const { username = '', permissions = [], _id = '' } = payload.userCredentials || {};
            const xAuthToken = payload.token

            return state.setIn([], fromJS(merge(state, {
                username: username,
                permissions: permissions,
                _id: _id,
                'x-auth-token': xAuthToken
            })));

        case LOGOUT_SUCCESS:
            return state.setIn([], fromJS({}))

        default: return state;
    }
};

export {
    authReducer
};