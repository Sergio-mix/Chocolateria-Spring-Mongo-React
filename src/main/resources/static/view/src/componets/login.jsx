import React, {useState} from 'react';

const Login = (props) => {
    const login = async function () {
        fetch('http://example.com/movies.json')
            .then(response => response.json())
            .then(data => console.log(data));
    }

    return (
        <div>
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
                                                           id={"txtEmail"}/>
                                                </div>
                                                <label>Password</label>
                                                <div className="mb-3">
                                                    <input type="password" className="form-control"
                                                           placeholder="Password"
                                                           aria-label="Password" aria-describedby="password-addon"
                                                           id={"txtPassword"}/>
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

            <script src="../../public/assets/js/manage.js"/>
            <script src="../../public/assets/js/core/popper.min.js"/>
            <script src="../../public/assets/js/core/bootstrap.min.js"/>
            <script src="../../public/assets/js/plugins/perfect-scrollbar.min.js"/>
            <script src="../../public/assets/js/plugins/smooth-scrollbar.min.js"/>
            <script async defer src="https://buttons.github.io/buttons.js"/>
            <script src="../../public/assets/js/soft-ui-dashboard.min.js?v=1.0.3"/>
        </div>
    );
}

export default Login;