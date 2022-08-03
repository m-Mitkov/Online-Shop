import { BASE_URL, GET_ALL } from '../../enums/apiEndPoints';

const JWT_TOKEN = 'x-auth-token';

export const getAll = (token) => {
    return fetch(BASE_URL + GET_ALL, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            [JWT_TOKEN]: token
        }
    })
        .then(res => res.json());
};