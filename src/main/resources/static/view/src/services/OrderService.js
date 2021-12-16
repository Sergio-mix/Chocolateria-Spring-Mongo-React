import http from './http-config';


const getAll = () => {
    return http.get(`/order/all`);
}

const get = (id) => {
    return http.get(`/order/${id}`);
}

const save = (data) => {
    return http.post(`/order/new`, data);
}

const update = (data) => {
    return http.put(`/order/update`, data);
}

const remove = (id) => {
    return http.delete(`/order/${id}`);
}

const exportedObject = {
    getAll,
    get,
    save,
    update,
    remove
}
export default exportedObject;


