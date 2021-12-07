const ID = sessionStorage.getItem('id');
const EMAIL = sessionStorage.getItem('email');
user();

async function user() {
    if (ID !== '' && ID !== null) {
        let user = await queryGD('GET', userByid + ID);

        if (user !== undefined) {
            document.getElementById('nameNav').innerText = user.name;
            sessionStorage.setItem('email', user.email);
        } else {
            doOpen('../index.html');
        }
    } else {
        doOpen('../index.html');
    }
}