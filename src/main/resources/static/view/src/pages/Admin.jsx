import React, {Fragment, useState, useEffect} from 'react';

import {doOpen, USER} from '../js/manage';
import Container from "../componets/Container";
import Table from "../componets/Table";
import UserService from "../services/UserService";
import ProductService from "../services/ProductService";
import Load from "../componets/Load";

const Admin = (props) => {
    if (USER === null) {
        doOpen('/');
    }

    //Load -------------------------------------------------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //User -------------------------------------------------------
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
            alert("Process error");
            console.log(e);
        });
    }

    useEffect(() => {
        tableDataUser();
    }, [])

    const onRegisterUser = (user) => {
        handleShow();
        let json = {};
        for (let val of user) {
            json[val.name] = val.value;

            if (val.value === '') {
                handleClose();
                alert('Invalid input values');
                return;
            }
        }

        UserService.save(json)
            .then((response) => {
                UserService.existsEmail(json.email)
                    .then((response) => {
                        if (response.data) {
                            tableDataUser();
                            handleClose();
                            alert('Save user');
                        } else {
                            handleClose();
                            alert('Could not save data');
                        }
                    }).catch(e => {
                    handleClose();
                    alert("Process error");
                    console.log(e);
                });
            }).catch(e => {
            handleClose();
            alert("Process error");
            console.log(e);
        });
    }

    const onEditUser = (user, data) => {
        handleShow();
        let json = {};

        for (let val of user) {
            json[val.name] = val.value;

            if (val.value === '') {
                handleClose();
                alert('Invalid input values');
                return;
            }
        }

        json['id'] = data.id;

        UserService.update(json)
            .then((response) => {
                tableDataUser();
                handleClose();
                alert('updated data');
            }).catch(e => {
            handleClose();
            alert("Process error");
            console.log(e);
        });
    }

    const onRemoveUser = (user) => {
        handleShow();
        UserService.remove(user.id)
            .then((response) => {
                UserService.existsEmail(user.email)
                    .then((response) => {
                        if (!response.data) {
                            tableDataUser();
                            handleClose();
                            alert('Remove user');
                        } else {
                            handleClose();
                            alert('Could not delete user');
                        }
                    }).catch(e => {
                    handleClose();
                    alert("Process error");
                    console.log(e);
                });
            }).catch(e => {
            handleClose();
            alert("Process error");
            console.log(e);
        });
    }

    let userListData = [
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
            name: "password",
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
            }, {
                value: "ADMIN",
                name: "Administrador"
            }]
        },
    ]

    //Product -------------------------------------------------------

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
            column: "Price",
            value: "price"
        },
        {
            column: "Quantity",
            value: "quantity"
        }
    ];

    const [productList, setProductList] = useState([]);

    const tableDataProduct = () => {
        ProductService.getAll()
            .then((response) => {
                setProductList(response.data);
            }).catch(e => {
            alert("Process error");
            console.log(e);
        });
    }

    useEffect(() => {
        tableDataProduct();
    }, [])

    const onRegisterProduct = (product) => {
        handleShow();
        let json = {};
        for (let val of product) {
            json[val.name] = val.value;

            if (val.value === '') {
                handleClose();
                alert('Invalid input values');
                return;
            }
        }

        ProductService.save(json)
            .then((response) => {
                tableDataProduct();
                handleClose();
                alert('Save Product');
            }).catch(e => {
            handleClose();
            alert("Process error");
            console.log(e);
        });
    }

    const onEditProduct = (product, data) => {
        handleShow();
        let json = {};

        for (let val of product) {
            json[val.name] = val.value;

            if (val.value === '') {
                handleClose();
                alert('Invalid input values');
                return;
            }
        }

        json['reference'] = data.reference;

        ProductService.update(json)
            .then((response) => {
                tableDataProduct();
                handleClose();
                alert('updated data');
            }).catch(e => {
            handleClose();
            alert("Process error");
            console.log(e);
        });
    }

    const onRemoveProduct = (user) => {
        handleShow();
        ProductService.remove(user.reference)
            .then((response) => {
                tableDataProduct();
                handleClose();
                alert('Remove Product');
            }).catch(e => {
            handleClose();
            alert("Process error");
            console.log(e);
        });
    }

    let productListData = [
        {
            size: "6",
            title: "Category",
            name: "category",
            status: "required",
            type: "text"
        },
        {
            size: "6",
            title: "Availability",
            name: "availability",
            type: "select",
            option: [{
                value: true,
                name: "Si"
            }, {
                value: false,
                name: "No"
            }]
        },
        {
            size: "6",
            title: "Price",
            name: "price",
            status: "required",
            type: "number"
        },
        {
            size: "6",
            title: "Quantity",
            name: "quantity",
            status: "required",
            type: "number"
        },
        {
            size: "6",
            title: "Description",
            name: "description",
            status: "required",
            type: "text"
        },
        {
            size: "6",
            title: "Photography",
            name: "photography",
            status: "required",
            type: "text"
        }
    ]

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

                                      add={{
                                          name: "Register",
                                          status: true,
                                          form: {
                                              buttonName: "Register",
                                              event: onRegisterUser,
                                              data: userListData,
                                              clear: true
                                          }
                                      }}

                                      update={{
                                          name: "Update",
                                          color: "text-color-yellow",
                                          form: {
                                              buttonName: "Update",
                                              event: onEditUser,
                                              data: userListData,
                                              clear: false,
                                              typeId: "id"
                                          }
                                      }}

                                      remove={{
                                          name: "Remove",
                                          color: "text-color-red",
                                          event: onRemoveUser
                                      }}
                       />,

                           <Table name="Products"
                                  data={productList} columns={columnsProduct}
                                  event={["update", "remove"]}

                                  add={{
                                      name: "Register",
                                      status: true,
                                      form: {
                                          buttonName: "Register",
                                          event: onRegisterProduct,
                                          data: productListData,
                                          clear: true
                                      }
                                  }}

                                  update={{
                                      name: "Update",
                                      color: "text-color-yellow",
                                      form: {
                                          buttonName: "Update",
                                          event: onEditProduct,
                                          data: productListData,
                                          clear: false,
                                          typeId: "reference"
                                      }
                                  }}

                                  remove={{
                                      name: "Remove",
                                      color: "text-color-red",
                                      event: onRemoveProduct
                                  }}
                           />]}/>
            <Load show={show}/>
        </Fragment>
    );
}

export default Admin;