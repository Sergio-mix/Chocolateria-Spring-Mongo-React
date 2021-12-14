import http from './http-config';


const getAll = () => {
    return http.get(`/chocolate/all`);
}

const get = (id) => {
    return http.get(`/chocolate/${id}`);
}

const save = (data) => {
    return http.post(`/chocolate/save`, data);
}

const exportedObject = {
    getAll,
    get
}
export default exportedObject;


