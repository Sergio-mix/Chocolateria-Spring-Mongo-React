sessionStorage.clear();
localStorage.clear();

async function loginAutenticate() {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;

    if (email !== '' && password !== '') {
        if (REGEX.test(email)) {
            let res = await user_login(email, password);
            if (res.id !== null) {
                sessionStorage.setItem('id', res.id);
                alert('Welcome');
                switch (res.type) {
                    case 'ADMIN':
                        doOpen('pages/tablesAdmin.html');
                        break;
                    case 'ASE':
                        doOpen('pages/tablesAdmin.html');
                        break;
                    case 'COORD':
                        doOpen('pages/tablesAdmin.html');
                        break;
                }
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