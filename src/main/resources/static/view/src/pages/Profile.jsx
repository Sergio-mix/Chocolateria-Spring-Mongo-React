import React, {Fragment} from 'react';
import FormData from "../componets/FormData";
import {doOpen, USER} from '../js/manage';
import Footer from "../componets/Footer";

const Profile = (props) => {

    const login = () => {
      doOpen('/');
    }

    const sessionUser = () => {
        switch (USER.type) {
            case 'ADMIN':
                doOpen('/admin');
                break;
            case 'ASE':
                doOpen('/');
                break;
            case 'COORD':
                doOpen('/');
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
                                <FormData name={USER.name} email={USER.email} zone={USER.zone}/>
                                <div className=" mt-3 mb-3 flex-row align-items-center m-auto">
                                    <button className="btn bg-gradient-info m-2" onClick={sessionUser}>Get into</button>
                                    <button className="btn btn-light-rounded m-2" onClick={login}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    );
}

export default Profile;