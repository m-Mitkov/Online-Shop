import { BASE_URL, PRODUCT_END_POIN } from '../../enums/apiEndPoints';

const JWT_TOKEN = 'x-auth-token';

export const getAll = (token) => {
    return fetch(BASE_URL + PRODUCT_END_POIN, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            [JWT_TOKEN]: token
        }
    })
        .then(res => res.json());
};

export const create = (token, data) => {
    return fetch(BASE_URL + PRODUCT_END_POIN, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            [JWT_TOKEN]: token
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json());
};

export const update = (token, data, idProduct) => {
    return fetch(BASE_URL + PRODUCT_END_POIN + `/${idProduct}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            [JWT_TOKEN]: token
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json());
};

export const deleteProduct = (token, idProduct) => {
    return fetch(BASE_URL + PRODUCT_END_POIN + `/${idProduct}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            [JWT_TOKEN]: token
        },
    })
        .then(res => res.json());
};