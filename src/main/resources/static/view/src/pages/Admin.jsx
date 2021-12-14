import React, {Fragment, useState, useEffect} from 'react';

import {doOpen, USER} from '../js/manage';
import Container from "../componets/Container";
import Table from "../componets/Table";
import UserService from "../services/UserService";
import ProductService from "../services/ProductService";
import FromData from "../componets/FromData";

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

    const tableDataUser = () => {
        UserService.getAll()
            .then((response) => {
                setUserList(response.data);
            }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
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
                }).catch(e => {
                console.log(e);
            });
        }

        tableDataProduct();
    }, [])

    const onRegisterUser = (user) => {
        let json = {};
        for (let val of user) {
            json[val.name] = val.value;

            if (val.value === '') {
                alert('Invalid input values');
                return;
            }
        }

        UserService.save(json)
            .then((response) => {
                tableDataUser();
                alert('User created');
            }).catch(e => {
            console.log(e);
        });
    }

    const onEditUser = (user) => {

    }

    const onRemoveUser = (user) => {

    }

    const onRegisterProduct = () => {

    }

    const onEditProduct = (user) => {

    }

    const onRemoveProduct = (user) => {

    }

    return (
        <Fragment>
            <Container title="System" profile_name={USER.name} footer={{
                name: "Product store",
                boxs: [{name: "GitHub", url: "https://github.com/Sergio-mix", icon: "github", status: ""}]
            }}
                       nav={[{name: "table", url: "/admin", icon: "table", status: "shadow"}]}
                       table={[<Table name="Users"
                                      data={userList} columns={columnsUser}
                                      event={["update", "remove"]}
                                      onEdit={onEditUser} onDelete={onRemoveUser}
                                      onDetail={null}
                                      add={{
                                          status: true,
                                          name: "Register",
                                          form: <FromData event={onRegisterUser}
                                                          data={[
                                                              {
                                                                  size: "6",
                                                                  title: "Identification",
                                                                  name: "identification",
                                                                  status: "required",
                                                                  type: "number"
                                                              },
                                                              {
                                                                  size: "6",
                                                                  title: "Name",
                                                                  name: "name",
                                                                  status: "required",
                                                                  type: "text"
                                                              },
                                                              {
                                                                  size: "6",
                                                                  title: "Address",
                                                                  name: "address",
                                                                  status: "required",
                                                                  type: "text"
                                                              },
                                                              {
                                                                  size: "6",
                                                                  title: "CellPhone",
                                                                  name: "cellPhone",
                                                                  status: "required",
                                                                  type: "number"
                                                              },
                                                              {
                                                                  size: "6",
                                                                  title: "Email",
                                                                  name: "email",
                                                                  status: "required",
                                                                  type: "email"
                                                              },
                                                              {
                                                                  size: "6",
                                                                  title: "Password",
                                                                  name: "password ",
                                                                  status: "required",
                                                                  type: "password"
                                                              },
                                                              {
                                                                  size: "6",
                                                                  title: "Zone",
                                                                  name: "zone",
                                                                  status: "required",
                                                                  type: "text"
                                                              },
                                                              {
                                                                  size: "6",
                                                                  title: "Type",
                                                                  name: "type",
                                                                  type: "select",
                                                                  option: [{
                                                                      value: "COORD",
                                                                      name: "Coordinadores de Zona"
                                                                  }, {
                                                                      value: "ASE",
                                                                      name: "Asesores Comerciales"
                                                                  }]
                                                              },
                                                          ]
                                                          }/>
                                      }}/>,

                           <Table name="Products" data={productList} columns={columnsProduct}
                                  event={["update", "remove"]} onEdit={onEditProduct} onDelete={onRemoveProduct}
                                  onDetail={null}
                                  add={{status: true, name: "Register"}}/>]}/>
        </Fragment>
    );
}

export default Admin;