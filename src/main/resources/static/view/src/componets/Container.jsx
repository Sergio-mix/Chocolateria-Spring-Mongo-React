import React, {Fragment, useState, useRef} from 'react';

import Nav from "./Nav";
import Footer from "./Footer";

const Container = (props) => {
    return (
        <Fragment>
            <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
                <Nav title={props.title} profile_name={props.profile_name}
                     boxs={props.nav}/>
                <div className="container-fluid py-4">
                    {props.table}
                    <Footer info={props.footer}/>
                </div>
            </main>

        </Fragment>
    )
}

export default Container;