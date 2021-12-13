const API = 'http://localhost:8080/';
//const API = 'http://129.158.59.187:8000/';

const ID = sessionStorage.getItem('id');
export const USER = JSON.parse(sessionStorage.getItem('user'));

//Login
const authenticate = API + 'api/user/';
const validate_Email = API + 'api/user/emailexist/';

//User
export const userByid = API + 'api/user/' + ID;
const all_user = API + 'api/user/all';
const remove_user = API + 'api/user/'
const update_user = API + 'api/user/update/';
const add_user = API + 'api/user/new/';

const add_product = API + 'api/chocolate/new';
const all_product = API + 'api/chocolate/all';
const remove_product = API + 'api/chocolate/'
const productByid = API + 'api/chocolate/';
const product_update = API + 'api/chocolate/update';

const add_order = API + 'api/order/new';
const all_order = API + 'api/order/all';
const all_order_zone = API + 'api/order/zona';
const remove_oreder = API + 'api/order/'
const orderByid = API + 'api/order/';
const order_update = API + 'api/order/update';

export const REGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

export function user_login(email, password) {
    return new Promise(resolve => {
        return resolve(
            fetch(authenticate + email + '/' + password, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(res => {
                sessionStorage.setItem('id', res.id);
                sessionStorage.setItem('user', JSON.stringify(res));
                return res;
            }).catch(err => {
                console.log(err);
            })
        );
    });
}

export function queryPT(type, url, object) {
    return new Promise(resolve => {
        return resolve(
            fetch(url, {
                method: type,
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(object)
            }).then(res => res.json()).then(res => {
                return res;
            }).catch(err => {
                console.log(err);
            })
        );
    });
}

export function queryGD(type, url) {
    return new Promise(resolve => {
        return resolve(
            fetch(url, {
                method: type,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(res => {
                return res;
            }).catch(err => {
                console.log(err);
            })
        );
    });
}

export function doOpen(url) {
    document.location.target = "_blank";
    document.location.href = url;
}