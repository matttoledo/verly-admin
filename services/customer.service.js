import { apiUrl } from '../config.js';
import { fetchWrapper } from '../helpers';

export const customerService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getAddressByCep
};


const baseUrl = `${apiUrl}/customer`;


function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}

function getAddressByCep(cep){
    return cep?fetchWrapper.get(`https://viacep.com.br/ws/${cep}/json/`):null;
}