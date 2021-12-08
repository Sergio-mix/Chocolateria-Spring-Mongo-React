sessionStorage.clear();
localStorage.clear();
loginForm();

async function loginAutenticate() {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;

    if (email !== '' && password !== '') {
        if (REGEX.test(email)) {
            document.getElementById('load_modal').classList.add('show');
            let res = await user_login(email, password);
            if (res.id !== null) {
                sessionStorage.setItem('id', res.id);
                document.getElementById('load_modal').classList.remove('show');
                profileForm();
            } else {
                document.getElementById('load_modal').classList.remove('show');
                alert('The email or password may be wrong')
            }
        } else {
            alert('Check the mail');
        }
    } else {
        alert('Verify information');
    }
}

function loginForm() {
    document.getElementById('login').innerHTML =
        ' <div class="col-lg-4 col-md-8 col-12 mx-auto">\n' +
        '                    <div class="card z-index-0 fadeIn3 fadeInBottom">\n' +
        '                        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-4">\n' +
        '                            <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">\n' +
        '                                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="card-body">\n' +
        '                            <form role="form" class="text-start">\n' +
        '                                <div class="input-group input-group-outline my-3">\n' +
        '                                    <label class="form-label">Email</label>\n' +
        '                                    <input id="txtEmail" type="email" class="form-control">\n' +
        '                                </div>\n' +
        '                                <div class="input-group input-group-outline mb-3">\n' +
        '                                    <label class="form-label">Password</label>\n' +
        '                                    <input id="txtPassword" type="password" class="form-control">\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="text-center">\n' +
        '                                    <button type="button" onclick="loginAutenticate()"\n' +
        '                                            class="btn bg-gradient-primary w-100 my-4 mb-2">Sign in\n' +
        '                                    </button>\n' +
        '                                </div>\n' +
        '                            </form>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>';
}

function profileForm() {
    document.getElementById('login').innerHTML =
        ' <div class="container-fluid px-2 px-md-4 max-width-500 card">\n' +
        '<div class="text-center mt-2"><h2>User</h2></div>'+
        '        <div class="page-header min-height-200 border-radius-xl mt-2"\n' +
        '             style="background-image: ' +
        'url(\'https://p4.wallpaperbetter.com/wallpaper/74/248/864/neon-hd-4k-8k-wallpaper-preview.jpg\');">\n' +
        '            <span class="mask  bg-gradient-primary  opacity-6"></span>\n' +
        '        </div>\n' +
        '        <div class="card card-body mx-3 mx-md-4 mt-n6 align-items-center">\n' +
        '            <div class="row gx-4 mb-2" >\n' +
        '                <div class="col-auto my-auto">\n' +
        '                    <div class="h-100 align-items-center text-center">\n' +
        '                        <h5 class="mb-1" id="nameProfile"></h5>\n' +
        '                        <p class="mb-0 font-weight-normal text-sm" id="typeProfile"></p>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="row">\n' +
        '                <div class="row">\n' +

        '                            <div class="card-body p-3">\n' +
        '                                <ul class="list-group">\n' +
        '                                    <li class="list-group-item border-0 ps-0 text-sm"><strong\n' +
        '                                            class="text-dark">Email: </strong> &nbsp; <a id="emailProfile"> </a>\n' +
        '                                    </li>\n' +
        '                                    <li class="list-group-item border-0 ps-0 text-sm"><strong\n' +
        '                                            class="text-dark">Zone: </strong> &nbsp; <a id="zoneProfile"> </a>\n' +
        '                                    </li>\n' +
        '                                </ul>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '<div class=" mt-3 mb-3 flex-row align-items-center m-auto"> ' +
        '<button class="btn btn-primary arrowCenter m-2" onclick="ini()">Get into</button>' +
        '<a class="btn btn-light m-2" href="index.html">Close</a>' +
        '</div>' +
        '</div>\n' +
        '</div>';

    profileLogin();
}