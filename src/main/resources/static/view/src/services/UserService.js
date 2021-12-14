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

const exportedObject = {
    getAll,
    get,
    authenticate
}
export default exportedObject;

  
