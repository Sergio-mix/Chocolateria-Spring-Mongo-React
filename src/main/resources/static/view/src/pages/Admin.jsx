import React, {Fragment, useState, useEffect} from 'react';

import {doOpen, USER} from '../js/manage';
import Container from "../componets/Container";
import Table from "../componets/Table";
import UserService from "../services/UserService";
import ProductService from "../services/ProductService";

const Admin = (props) => {
    if (USER === null) {
        doOpen('/');
    }

    const columnsUser = [
        {
            column: "Identification",
            value: "identification"
        }, {
            column: "Name",
            value: "name"
        }, {
            column: "Address",
            value: "address"
        }, {
            column: "CellPhone",
            value: "cellPhone"
        }, {
            column: "Email",
            value: "email"
        }, {
            column: "Zone",
            value: "zone"
        }, {
            column: "Type",
            value: "type"
        }];

    const [userList, setUserList] = useState([]);
    useEffect(() => {
        const tableDataUser = () => {
            UserService.getAll()
                .then((response) => {
                    setUserList(response.data);
                    console.log(response.data);
                }).catch(e => {
                console.log(e);
            });
        }

        tableDataUser();
    }, [])
    const [productList, setProductList] = useState([]);

    const columnsProduct = [
        {
            column: "Reference",
            value: "reference"
        }, {
            column: "Category",
            value: "category"
        },
        {
            column: "Description",
            value: "description"
        }, {
            column: "Availability",
            value: "availability"
        }, {
            column: "Price",
            value: "price"
        },
        {
            column: "Quantity",
            value: "quantity"
        }
    ];

    useEffect(() => {
        const tableDataProduct = () => {
            ProductService.getAll()
                .then((response) => {
                    setProductList(response.data);
                    console.log(response.data);
                }).catch(e => {
                console.log(e);
            });
        }

        tableDataProduct();
    }, [])

    const onEditUser = (id) => {

    }

    return (
        <Fragment>
            <Container title="System" profile_name={USER.name} footer={{
                name: "Product store",
                boxs: [{name: "GitHub", url: "https://github.com/Sergio-mix", icon: "github", status: ""}]
            }}
                       nav={[{name: "table", url: "/admin", icon: "table", status: "shadow"}]}
                       table={[<Table name="Users" data={userList} columns={columnsUser} onEditUser={[
                           onEditUser && (
                               <button onClick={ev => onEditUser()} className="btn btn-warning">Editar</button>)]}/>,

                           <Table name="Products" data={productList} columns={columnsProduct}/>]}/>
        </Fragment>
    );
}

export default Admin;