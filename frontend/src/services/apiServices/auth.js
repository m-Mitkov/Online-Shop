import { BASE_URL, REGISTER, LOGIN, LOGOUT } from '../../enums/apiEndPoints';
const JWT_TOKEN = 'x-auth-token';

export const login = (data) => {
    return fetch(BASE_URL + LOGIN, {
        method: 'POST',
        // credentials: 'include',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json());
};

export const logout = (token) => {
    return fetch(BASE_URL + LOGOUT, {
        method: 'GET',
        headers:{
            'Content-type': 'application/json',
            [JWT_TOKEN]: token
        },
    })
    .then(res => res.json());
};

export const register = (data) => {
    return fetch(BASE_URL + REGISTER, {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json());
};
