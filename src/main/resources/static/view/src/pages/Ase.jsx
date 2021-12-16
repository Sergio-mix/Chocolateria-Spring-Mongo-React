import React, {Fragment, useState, useEffect} from 'react';

import {doOpen, USER, date} from '../js/manage';
import {columnsOrder, columnsOrderProduct, columnsProduct, columnsProductOrder} from '../js/tablesAndForm';
import Container from "../componets/Container";
import Table from "../componets/Table";
import OrderService from "../services/OrderService";
import ProductService from "../services/ProductService";
import Load from "../componets/Load";

const Ase = (props) => {

    if (USER === null) {
        doOpen('/');
    }

    //Load -------------------------------------------------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Order -------------------------------------------------------
    const [orderList, setOrderList] = useState([]);

    const tableDataOreder = () => {
        OrderService.getAll()
            .then((response) => {
                let orders = [];
                for (let order of response.data) {
                    orders.push(
                        {
                            salesMan_identification: order.salesMan.identification,
                            salesMan_name: order.salesMan.name,
                            salesMan_email: order.salesMan.email,
                            registerDay: order.registerDay,
                            id: order.id,
                            products: order.products,
                            status: order.status,
                            quantities: order.quantities
                        })
                }
                setOrderList(orders);
            }).catch(e => {
            alert("Process error");
            console.log(e);
        });
    }

    useEffect(() => {
        tableDataOreder();
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
                tableDataOreder();
                handleClose();
                alert('Save Product');
            }).catch(e => {
            handleClose();
            alert("Process error");
            console.log(e);
        });
    }

    const getOrderAllProducts = (order) => {
        handleShow();
        let list = [];
        let count = order.quantities;
        for (let product in order.products) {
            let dis = '';
            let countI = 0;

            if (order.products[product].availability) {
                dis = 'Si';
            } else {
                dis = 'No';
            }

            for (let i in count) {
                if (i === order.products[product].reference)
                    countI = count[i]
            }

            list.push({
                reference: order.products[product].reference,
                category: order.products[product].category,
                description: order.products[product].description,
                availability: dis,
                price: order.products[product].price,
                quantity: order.products[product].quantity,
                quantity_order: countI
            });
        }

        handleClose();

        return <Table name={"Products: " + list.length}
                      data={list}
                      columns={columnsOrderProduct}
                      event={[]}

                      add={{
                          status: false,
                      }}

                      addTable={{
                          status: false,
                      }}/>;
    }

    const [productOrdelList, setOrderproductOrdelList] = useState([]);

    const tableDataProduct = () => {
        ProductService.getAll()
            .then((response) => {
                for (let product of response.data) {
                    if (product.availability) {
                        product["availability_table"] = "Si";
                    } else {
                        product["availability_table"] = "No";
                    }
                    response.data[product] = product;
                }
                setOrderproductOrdelList(response.data);
            }).catch(e => {
            alert("Process error");
            console.log(e);
        });
    }

    useEffect(() => {
        tableDataProduct();
    }, [])


    return (
        <Fragment>
            <Container title="System" profile_name={USER.name} footer={{
                name: "Product store",
                boxs: [{name: "GitHub", url: "https://github.com/Sergio-mix", icon: "github", status: ""}]
            }}
                       nav={[{name: "table", url: "/ase", icon: "table", status: "shadow"}]}
                       container={[<div className="container-fluid py-4">
                           <div className="row mt-2">
                               <div className="col-lg-4">
                                   <div className="card h-100">
                                       <div className="card-body">
                                           <h5 className="font-weight-bolder">Invoice information</h5>
                                           <div className="row">
                                               <div className="col-12 mt-4">
                                                   <div className="col-6 col-sm-12">
                                                       <label>Date</label>
                                                       <h3>{date()}</h3>
                                                   </div>
                                                   <div className="col-6 col-sm-12">
                                                       <label>Status</label>
                                                       <h3>Pendiente</h3>
                                                   </div>
                                                   <div className="col-6 col-sm-12">
                                                       <label>SalesMan</label>
                                                       <h3>{USER.name}</h3>
                                                   </div>
                                                   <div className="card-body ">
                                                       <button type="button"
                                                               className="btn bg-gradient-primary col-md-12"
                                                               data-bs-toggle="modal"
                                                               onClick="registerOrder()">
                                                           Register Order
                                                       </button>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                               <div className="col-lg-8 mt-lg-0 mt-2">
                                   <Table name={<h4>Product order</h4>}
                                          data={[]} columns={columnsProductOrder}
                                          event={["remove"]}

                                          add={{
                                              status: false,
                                          }}

                                          addTable={{
                                              name: "Add product",
                                              status: true,
                                              table: {
                                                  buttonName: "Ok",
                                                  width: "width-1200",
                                                  event: '',
                                                  table: <Table name={"Products: "}
                                                                data={productOrdelList}
                                                                columns={columnsProduct}
                                                                event={["aux"]}

                                                                add={{
                                                                    status: false,
                                                                }}

                                                                addTable={{
                                                                    status: false,
                                                                }}

                                                                aux={{
                                                                    name: "Add",
                                                                    event: {tableDataProduct},
                                                                    color: "text-color-yellow"
                                                                }}
                                                  />
                                              }
                                          }}

                                          remove={{
                                              name: "Remove",
                                              color: "text-color-red",
                                              event: ''
                                          }}
                                   />
                               </div>
                           </div>
                       </div>,
                           <Table name="Order"
                                  data={orderList} columns={columnsOrder}
                                  event={["detail"]}

                                  add={{
                                      status: false,
                                  }}


                                  addTable={{
                                      status: false,
                                  }}

                                  detail={{
                                      name: "Order",
                                      width: "width-1000",
                                      event: getOrderAllProducts,
                                      color: "text-color-blue",
                                      columns: {columnsOrderProduct}
                                  }}
                           />]}/>
            <Load show={show}/>
        </Fragment>
    );
}

export default Ase;