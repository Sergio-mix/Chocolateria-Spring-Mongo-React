import React, {Fragment} from 'react';

import {all_product, all_user, doOpen, USER} from '../js/manage';
import Container from "../componets/Container";
import Table from "../componets/Table";

const Coord = (props) => {
    if (USER === null) {
        doOpen('/');
    }

    // const tableDataUser = () => {
    //     fetch(all_user, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => res.json()).then(res => {
    //         sessionStorage.setItem('listUser', JSON.stringify(res))
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }
    //
    // const tableDataProduct = () => {
    //     fetch(all_product, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => res.json()).then(res => {
    //         let list = [];
    //         for (let p of res) {
    //             let a = p.availability;
    //             if (a) {
    //                 p.availability = "Si";
    //             } else {
    //                 p.availability = "No";
    //             }
    //             list.push(p)
    //         }
    //         sessionStorage.setItem('listProduct', JSON.stringify(list))
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }
    //
    // const columnsUser = [
    //     {
    //         column: "Identification",
    //         value: "identification"
    //     }, {
    //         column: "Name",
    //         value: "name"
    //     }, {
    //         column: "Address",
    //         value: "address"
    //     }, {
    //         column: "CellPhone",
    //         value: "cellPhone"
    //     }, {
    //         column: "Email",
    //         value: "email"
    //     }, {
    //         column: "Zone",
    //         value: "zone"
    //     }, {
    //         column: "Type",
    //         value: "type"
    //     }];
    // tableDataUser();
    // let rowUsers = JSON.parse(sessionStorage.getItem('listUser'));
    //
    // const columnsProduct = [
    //     {
    //         column: "Reference",
    //         value: "reference"
    //     }, {
    //         column: "Category",
    //         value: "category"
    //     },
    //     {
    //         column: "Description",
    //         value: "description"
    //     }, {
    //         column: "Availability",
    //         value: "availability"
    //     }, {
    //         column: "Price",
    //         value: "price"
    //     },
    //     {
    //         column: "Quantity",
    //         value: "quantity"
    //     }
    // ];
    // tableDataProduct();
    // let rowProduct = JSON.parse(sessionStorage.getItem('listProduct'))


    return (
        <Fragment>
            {/*<Container title="System" profile_name={USER.name} footer={{*/}
            {/*    name: "Product store",*/}
            {/*    boxs: [{name: "GitHub", url: "https://github.com/Sergio-mix", icon: "github", status: ""}]*/}
            {/*}}*/}
            {/*           nav={[{name: "table", url: "/admin", icon: "table", status: "shadow"}]}*/}
            {/*           table={[<Table name="Users" data={rowUsers} columns={columnsUser}/>,*/}
            {/*               <Table name="Product" data={rowProduct} columns={columnsProduct}/>]}/>*/}
        </Fragment>
    );
}

export default Coord;