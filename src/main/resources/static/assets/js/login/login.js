sessionStorage.clear();
localStorage.clear();

async function loginAutenticate() {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;
    const REGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (email !== '' && password !== '') {
        if (REGEX.test(email)) {
            let res = await user_login(email, password);
            if (res.id !== null) {
                sessionStorage.setItem('id', res.id);
                alert('Welcome');
                doOpen('pages/tables.html');
            } else {
                alert('The email or password may be wrong')
            }
        } else {
            alert('Check the mail');
        }
    } else {
        alert('Verify information');
    }

}