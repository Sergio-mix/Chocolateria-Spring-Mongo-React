allUsers();

async function allUsers() {
    const request = await fetch(all_user, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        // location.reload();
    })

    const users = await request.json();

    let listHtml = '';
    for (let user of users) {
        let remove = "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='deleteUser(" + user.id + ")'>" +
            "Remove</button>";

        if (user.id === +ID) {
            remove = '';
        }

        let fila =
            "<tr><td> " + user.identification + "</td>" +
            "<td> " + user.name + "</td>" +
            "<td> " + user.address + "</td>" +
            "<td> " + user.cellPhone + "</td>" +
            "<td> " + user.email + "</td>" +
            "<td> " + user.zone + "</td>" +
            "<td> " + user.type + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='updateUser(" + user.id + ")'>Update</button>" +
            remove +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableUsers tbody').outerHTML = listHtml;
    document.getElementById('numberUsers').innerText = users.length;
}

function deleteUser(id) {
    document.getElementById('modal_container').classList.add('show');
    document.getElementById('titleModal').innerText = 'Remove User';
    document.getElementById('containerModal').innerHTML =
        '<div class="row g-3 modal-dialog-scrollable navbar-nav-scroll">\n' +
        '                 <div class="col-8 mx-auto">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtPasswordUser" >Current password</label>\n' +
        '                        <input class="form-control" type="password" id="txtPasswordUser">\n' +
        '                    </div>\n' +
        '                  </div>' +
        '            <div class="col-12">\n' +
        '                    <button id="onClickUserRemove" type="button" class="btn btn-primary">Remove</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '             </div>' +
        '</div>';

    document.getElementById('onClickUserRemove').onclick = async function () {
        let password = document.getElementById('txtPasswordUser').value;
        if (password !== '') {
            document.getElementById('load_modal').classList.add('show');
            let res = await user_login(EMAIL, password);

            if (res.id !== null) {
                await queryGD('DELETE', remove_user + id);
                let us = await queryGD('GET', userByid + id);

                if (us === undefined) {
                    document.getElementById('load_modal').classList.remove('show');
                    document.getElementById('modal_container').classList.remove('show');
                    alert('User Deleted');
                    await allUsers();
                } else {
                    document.getElementById('load_modal').classList.remove('show');
                    alert('Could not delete user')
                }

            } else {
                document.getElementById('load_modal').classList.remove('show');
                alert('Incorrect password');
            }

        } else {
            document.getElementById('load_modal').classList.remove('show');
            alert('Please enter the password');
        }
    }
}

async function updateUser(id) {
    fromUser('Update User');

    let us = await queryGD('GET', userByid + id);
    let emailValidation = us.email;
    document.getElementById('txtIdentification').value = us.identification;
    document.getElementById('txtName').value = us.name;
    document.getElementById('txtAddress').value = us.address;
    document.getElementById('txtCellPhone').value = us.cellPhone;
    document.getElementById('txtEmail').value = us.email;
    document.getElementById('txtPassword').value = us.password;
    document.getElementById('txtZone').value = us.zone;
    document.getElementById('txtType').value = us.type;


    document.getElementById('onClickUpdateUser').onclick = async function () {
        let identification = document.getElementById('txtIdentification').value;
        let name = document.getElementById('txtName').value;
        let address = document.getElementById('txtAddress').value;
        let cellPhone = document.getElementById('txtCellPhone').value;
        let email = document.getElementById('txtEmail').value;
        let password = document.getElementById('txtPassword').value;
        let zone = document.getElementById('txtZone').value;
        let type = document.getElementById('txtType').value;
        let pass = document.getElementById('txtPasswordUser').value;

        if (identification !== ''
            && name !== ''
            && address !== ''
            && cellPhone !== ''
            && email !== ''
            && zone !== ''
            && type !== ''
            && pass !== ''
            && password !== ''
            && email.length <= 50
            && password.length <= 50
            && REGEX.test(email)) {
            document.getElementById('load_modal').classList.add('show');
            let res = await user_login(EMAIL, pass);
            if (res.id !== null) {
                if (emailValidation !== email) {
                    let validation = await queryGD('GET', validate_Email + email);
                    if (validation === true) {
                        document.getElementById('load_modal').classList.remove('show');
                        alert('The email is already registered');
                        return;
                    }
                }

                await queryPT('PUT', update_user, {
                    id: id,
                    identification: identification,
                    name: name,
                    address: address,
                    cellPhone: cellPhone,
                    email: email,
                    zone: zone,
                    type: type,
                    password: password
                }).then(async e => {
                    document.getElementById('load_modal').classList.remove('show');
                    document.getElementById('modal_container').classList.remove('show');
                    alert('Updated user data');
                    await allUsers();
                });
            } else {
                document.getElementById('load_modal').classList.remove('show');
                alert('Incorrect password');
            }
        } else {
            document.getElementById('load_modal').classList.remove('show');
            alert('Invalid input values');
        }
    }
}

function registerUser() {
    fromUser('Register User');

    document.getElementById('onClickUpdateUser').onclick = async function () {
        let identification = document.getElementById('txtIdentification').value;
        let name = document.getElementById('txtName').value;
        let address = document.getElementById('txtAddress').value;
        let cellPhone = document.getElementById('txtCellPhone').value;
        let email = document.getElementById('txtEmail').value;
        let password = document.getElementById('txtPassword').value;
        let zone = document.getElementById('txtZone').value;
        let type = document.getElementById('txtType').value;
        let pass = document.getElementById('txtPasswordUser').value;

        if (identification !== ''
            && name !== ''
            && address !== ''
            && cellPhone !== ''
            && email !== ''
            && zone !== ''
            && type !== ''
            && pass !== ''
            && password !== ''
            && email.length <= 50
            && password.length <= 50
            && REGEX.test(email)) {
            document.getElementById('load_modal').classList.add('show');
            let res = await user_login(EMAIL, pass);
            if (res.id !== null) {
                let validation = await queryGD('GET', validate_Email + email);
                if (validation === false) {
                    await queryPT('POST', add_user, {
                        id: +identification,
                        identification: identification,
                        name: name,
                        address: address,
                        cellPhone: cellPhone,
                        email: email,
                        zone: zone,
                        type: type,
                        password: password
                    }).then(async e => {
                        document.getElementById('load_modal').classList.remove('show');
                        document.getElementById('modal_container').classList.remove('show');
                        alert('User created');
                        await allUsers();
                    });
                } else {
                    document.getElementById('load_modal').classList.remove('show');
                    alert('The email is already registered');
                }
            } else {
                document.getElementById('load_modal').classList.remove('show');
                alert('Incorrect password');
            }
        } else {
            document.getElementById('load_modal').classList.remove('show');
            alert('Invalid input values');
        }
    }
}

function fromUser(title) {
    document.getElementById('modal_container').classList.add('show');
    document.getElementById('titleModal').innerText = title;
    document.getElementById('containerModal').innerHTML =
        '<div class="row g-3 modal-dialog-scrollable navbar-nav-scroll">\n' +
        '               <div class="col-md-6">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtIdentification" >Identification <strong>(required)</strong></label>\n' +
        '                        <input class="form-control" type="number" id="txtIdentification">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtName" >Name <strong>(required)</strong></label>\n' +
        '                        <input class="form-control" type="text" id="txtName">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-6">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtAddress" >Address <strong>(required)</strong></label>\n' +
        '                        <input class="form-control" type="text" id="txtAddress">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-6">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtCellPhone" >CellPhone <strong>(required)</strong></label>\n' +
        '                        <input class="form-control" type="number" id="txtCellPhone">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtEmail" >Email <strong>(required)</strong></label>\n' +
        '                        <input class="form-control" type="email" id="txtEmail">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtNewpassword" >Password <strong>(required)</strong></label>\n' +
        '                        <input class="form-control" type="password" id="txtPassword">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtZone" >Zone <strong>(required)</strong></label>\n' +
        '                        <input class="form-control" type="text" id="txtZone">\n' +
        '                    </div>\n' +
        '                </div>' +
        '                <div class="col-md-6">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtType" >Type</label>\n' +
        '                        <select class="form-control" id="txtType">' +
        '                            <option value="COORD">Coordinadores de Zona</option>' +
        '                            <option value="ASE">Asesores Comerciales</option>' +
        '                        </select>\n' +
        '                    </div>\n' +
        '                </div>' +
        '                <div class="col-12">\n' +
        '                    <div class="form-group label-floating">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtPasswordUser" >Current password</label>\n' +
        '                        <input class="form-control" type="password" id="txtPasswordUser">\n' +
        '                    </div>\n' +
        '                    </div>\n' +
        '                </div>' +
        '            <div class="col-12">\n' +
        '                    <button id="onClickUpdateUser" type="button" class="btn btn-primary">' + title + '</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '             </div>' +
        '</div>';
}

function closeModal() {
    document.getElementById('modal_container').classList.remove('show');
}