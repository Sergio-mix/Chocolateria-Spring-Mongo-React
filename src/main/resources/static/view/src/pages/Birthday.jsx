import React, {Fragment, useState, useEffect} from 'react';

import {doOpen, USER} from '../js/manage';
import {
    columnsProductAseCli
} from '../js/tablesAndForm';
import Container from "../componets/Container";
import Table from "../componets/Table";
import ProductService from "../services/ProductService";

const Birthday = (props) => {

    if (USER === null) {
        doOpen('/');
    }

    const [productAll, setProductAll] = useState([]);

    const tableDataProduct = (event) => {
        event.then((response) => {
            for (let product of response.data) {
                product["count_order"] = 1;
                if (product.availability) {
                    product["availability_table"] = "Si";
                } else {
                    product["availability_table"] = "No";
                }
                response.data[product] = product;
            }

            setProductAll(response.data);
        }).catch(e => {
            alert("Process error");
            console.log(e);
        });
    }

    useEffect(() => {
        tableDataProduct(ProductService.getAll());
    }, [])


    return (
        <Fragment>
            <Container title="System" profile_name={USER.name} footer={{
                name: "Product store",
                boxs: [{name: "GitHub", url: "https://github.com/Sergio-mix", icon: "github", status: ""}]
            }}
                       nav={[{name: "Products", url: "/products", icon: "store-alt", status: ""},
                           {name: "Birthday", url: "/birthday", icon: "birthday-cake", status: "shadow"}]}
                       container={[
                           <Table name={<h5 className="m-2">Products: {productAll.length}</h5>}
                                  data={productAll} columns={columnsProductAseCli}
                                  event={[]}

                                  add={{
                                      status: false,
                                  }}


                                  addTable={{
                                      status: false,
                                  }}

                           />]}/>
        </Fragment>
    );
}

export default Birthday;