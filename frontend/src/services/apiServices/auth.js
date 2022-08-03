import { BASE_URL, REGISTER, LOGIN, LOGOUT } from '../../enums/apiEndPoints';

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

export const logout = () => {
    return fetch(BASE_URL + LOGOUT, {
        headers:{
            'Content-type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
        credentials: 'include',
    })
    .then(res => res.json());
};

export const register = (data) => {
    return fetch(BASE_URL + REGISTER, {
        method: 'POST',
        credentials: "include",
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json());
};
