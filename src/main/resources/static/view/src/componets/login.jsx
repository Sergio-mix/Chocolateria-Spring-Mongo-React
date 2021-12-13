import React, {Fragment, useState, useRef} from 'react';

import ReactDOM from "react-dom";
import Profile from "./profile/Profile";
import {REGEX, user_login} from '../js/manage';


const Login = (props) => {
    const txtEmail = useRef();
    const txtPassword = useRef();

    const profile = () => {
        const element = (
            <Fragment>
                <Profile/>
            </Fragment>
        );
        ReactDOM.render(element,
            document.getElementById('root')
        );
    }

    const login = async () => {
        let email = txtEmail.current.value;
        let password = txtPassword.current.value;

        if (email !== '' && password !== '') {
            if (REGEX.test(email)) {
                let res = await user_login(email,password);
                if (res.id !== null) {
                    sessionStorage.setItem('user', JSON.stringify(res));
                    profile();
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

    return (
        <Fragment>
            <main className="main-content  mt-0">
                <section>
                    <div className="page-header min-vh-75">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                    <div className="card card-plain mt-8">
                                        <div className="card-header pb-0 text-left bg-transparent">
                                            <h3 className="font-weight-bolder text-info text-gradient">Welcome back</h3>
                                            <p className="mb-0">Enter your email and password to sign in</p>
                                        </div>
                                        <div className="card-body">
                                            <form role="form">
                                                <label>Email</label>
                                                <div className="mb-3">
                                                    <input type="email" className="form-control" placeholder="Email"
                                                           aria-label="Email" aria-describedby="email-addon"
                                                           ref={txtEmail}/>
                                                </div>
                                                <label>Password</label>
                                                <div className="mb-3">
                                                    <input type="password" className="form-control"
                                                           placeholder="Password"
                                                           aria-label="Password" aria-describedby="password-addon"
                                                           ref={txtPassword}/>
                                                </div>
                                                <div className="text-center">
                                                    <button type="button"
                                                            className="btn bg-gradient-info w-100 mt-4 mb-0"
                                                            onClick={login}>Sign in
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                        <div
                                            className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                                            style={{backgroundImage: "url(assets/img/curved-images/curved6.jpg)"}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <script src="../../public/assets/js/core/popper.min.js"/>
            <script src="../../public/assets/js/core/bootstrap.min.js"/>
            <script src="../../public/assets/js/plugins/perfect-scrollbar.min.js"/>
            <script src="../../public/assets/js/plugins/smooth-scrollbar.min.js"/>
            <script async defer src="https://buttons.github.io/buttons.js"/>
            <script src="../../public/assets/js/soft-ui-dashboard.min.js?v=1.0.3"/>
        </Fragment>
    );
}

export default Login;