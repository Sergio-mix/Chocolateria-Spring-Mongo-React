import http from './http-config';

const authenticate = (email, password) => {
    return http.get(`/user/${email}/${password}`);
}

const getAll = () => {
    return http.get("/user/all");
}

const get = (id) => {
    return http.get(`/user/${id}`);
}

const save = (data) => {
    return http.post(`/user/new`, data);
}

const exportedObject = {
    getAll,
    get,
    authenticate,
    save
}
export default exportedObject;

  
