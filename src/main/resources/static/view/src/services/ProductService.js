import http from './http-config';


const getAll = () => {
    return http.get("/chocolate/all");
}

const get = (id) => {
    return http.get(`/chocolate/${id}`);
}

const exportedObject = {
    getAll,
    get
}
export default exportedObject;


