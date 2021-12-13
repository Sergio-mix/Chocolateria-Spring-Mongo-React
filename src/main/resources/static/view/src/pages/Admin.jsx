import React, {Fragment, useState, useRef} from 'react';

import {doOpen, USER} from '../js/manage';
import Container from "../componets/Container";

const Admin = (props) => {
    if (USER === null) {
        doOpen('/');
    }

    return (
        <Fragment>
            <Container title="System" profile_name={USER.name} footer={{
                name: "Product store",
                boxs: [{name: "GitHub", url: "https://github.com/Sergio-mix", icon: "github", status: ""}]
            }}
                       nav={[{name: "table", url: "/admin", icon: "table", status: "shadow"}]}/>
        </Fragment>
    );
}

export default Admin;