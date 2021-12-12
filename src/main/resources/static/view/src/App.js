import React, {useState} from 'react';
import UserForm from "./componets/UserForm";
import Table from "./componets/Table";
import Login from "./componets/login";

function App() {
    const columns = [{column: "Nombre", value: "nombre"}, {column: "Apellido", value: "apellido"},
        {column: "Dirección", value: "direccion"}, {column: "Edad", value: "edad"}, {column: "Sexo", value: "sexo"}]

    const initialState = {
        id: null,
        nombre: "",
        apellido: "",
        direccion: "",
        edad: "",
        sexo: "",

    };
    const values = []
    const [userList, setUserList] = useState(values);
    const [userToEdit, setUserToEdit] = useState(initialState);

    const addUser = (user) => {
        user.id = userList.length + 1;
        setUserList([...userList, user]);
    }

    const deleteUser = (user) => {
        setUserList(userList.filter(u => u.id !== user.id))

    }

    const activateEditMode = (user) => {
        setUserToEdit(user);
    }
    const editUser = (user) => {
        const itemIndex = userList.findIndex(data => data.id === user.id);
        setUserList([...userList.slice(0, itemIndex), user, ...userList.slice(itemIndex + 1)]);

    }

    return (
        <div className="container">
            <UserForm add={addUser} edit={editUser} user={userToEdit}/>
            <Table data={userList} columns={columns} onDelete={deleteUser} onEdit={activateEditMode}/>
        </div>
    );
}

export default App;
