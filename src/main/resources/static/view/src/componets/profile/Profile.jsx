import React, {Fragment, useState, useRef} from 'react';
import ReactDOM from "react-dom";
import Login from "../login";
import FormData from "./FormData";

const Profile = (props) => {

    const us = JSON.parse(sessionStorage.getItem('user'))

    const login = () => {
        const element = (
            <Fragment>
                <Login/>
            </Fragment>
        );
        ReactDOM.render(
            element,
            document.getElementById('root')
        );
        sessionStorage.clear();
    }

    const admin = () => {
        const element = (
            <Fragment>
                <Login/>
            </Fragment>
        );
        ReactDOM.render(
            element,
            document.getElementById('root')
        );
    }

    const ase = () => {
        const element = (
            <Fragment>
                <Login/>
            </Fragment>
        );
        ReactDOM.render(
            element,
            document.getElementById('root')
        );
    }

    const coord = () => {
        const element = (
            <Fragment>
                <Login/>
            </Fragment>
        );
        ReactDOM.render(
            element,
            document.getElementById('root')
        );
    }

    const sessionUser = () => {
        switch (us.type) {
            case 'ADMIN':
                admin();
                break;
            case 'ASE':
                ase();
                break;
            case 'COORD':
                coord();
                break;
        }
    }

    return (
        <Fragment>
            <main className="main-content  mt-0">
                <div className="page-header align-items-start min-vh-100"
                     style={{backgroundImage: "url(https://www.10wallpaper.com/wallpaper/1366x768/1711/Office_Desk_Keyboard_Art_Cup_Photo_HD_Wallpaper_1366x768.jpg)"}}>
                    <span className="mask bg-gradient-dark opacity-6"/>
                    <div className="container my-auto">
                        <div className="row" id="login">
                            <div className="container-fluid px-2 px-md-4 max-width-500 card">
                                <div className="text-center mt-2"><h2>User</h2></div>
                                <div className="page-header min-height-200 border-radius-xl mt-2"
                                     style={{backgroundImage: "url(assets/img/curved-images/curved14.jpg)"}}>
                                </div>
                                <FormData name={us.name} email={us.email} zone={us.zone}/>
                                <div className=" mt-3 mb-3 flex-row align-items-center m-auto">
                                    <button className="btn bg-gradient-info m-2" onClick={sessionUser}>Get into</button>
                                    <button className="btn btn-light-rounded m-2" onClick={login}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <script src="../../../public/assets/js/core/popper.min.js"/>
            <script src="../../../public/assets/js/core/bootstrap.min.js"/>
            <script src="../../../public/assets/js/plugins/perfect-scrollbar.min.js"/>
            <script src="../../../public/assets/js/plugins/smooth-scrollbar.min.js"/>
            <script async defer src="https://buttons.github.io/buttons.js"/>
            <script src="../../../public/assets/js/soft-ui-dashboard.min.js?v=1.0.3"/>
        </Fragment>
    );
}

export default Profile;