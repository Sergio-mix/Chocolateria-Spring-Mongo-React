const API = 'http://localhost:8080/';

const authenticate = API + 'api/user/';
const userByid = API + 'api/user/get/';
const all_user = API + 'api/user/all';
const remove_user = API + 'api/user/'
const update_user = API + 'api/user/update/';
const add_user = API + 'api/user/new/';

const validate_Email = API + 'api/user/emailexist/';

const add_product = API + 'api/chocolate/new';
const all_product = API + 'api/chocolate/all';
const remove_product = API + 'api/chocolate/'
const productByid = API + 'api/chocolate/get/';
const product_update = API + 'api/chocolate/update';

const REGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

function user_login(email, password) {
    return new Promise(resolve => {
        return resolve(
            fetch(authenticate + email + '/' + password, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(res => {
                return res;
            }).catch(err => {
                // location.reload();
            })
        );
    });
}

function queryPT(type, url, object) {
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
                // location.reload();
            })
        );
    });
}

function queryGD(type, url) {
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
                // location.reload();
            })
        );
    });
}


function doOpen(url) {
    document.location.target = "_blank";
    document.location.href = url;
}