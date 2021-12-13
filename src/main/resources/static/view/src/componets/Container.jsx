import React, {Fragment, useState, useRef} from 'react';

import Nav from "./Nav";
import Footer from "./Footer";
import Table from "./Table";

const Container = (props) => {
    const columns= [{column:"Nombre",value:"nombre"},{column:"Apellido",value:"apellido"},
        {column:"Dirección",value:"direccion"},{column:"Edad",value:"edad"},{column:"Sexo",value:"sexo"}]

    const initialState = {
        id:null,
        nombre:  "",
        apellido: "",
        direccion: "",
        edad: "",
        sexo: "",

    };
    const values = []
    const [userList, setUserList] = useState(values);
    const [userToEdit, setUserToEdit]=useState(initialState);

    const addUser = (user)=>{
        user.id = userList.length+1;
        setUserList([...userList, user]);
    }

    const deleteUser = (user)=>{
        setUserList(userList.filter(u => u.id !== user.id))
    }

    const activateEditMode = (user)=>{
        setUserToEdit(user);
    }
    const editUser = (user)=>{
        const itemIndex = userList.findIndex(data => data.id === user.id);
        setUserList([...userList.slice(0, itemIndex), user, ...userList.slice(itemIndex + 1)]);

    }


    return (
        <Fragment>
            <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
                <Nav title={props.title} profile_name={props.profile_name}
                     boxs={props.nav}/>
                <div className="container-fluid py-4">
                    <Table name="Users" data={userList} columns={columns} onDelete = {deleteUser} onEdit = {activateEditMode}/>
                    <Footer info={props.footer}/>
                </div>
            </main>

        </Fragment>
    )
}

export default Container;