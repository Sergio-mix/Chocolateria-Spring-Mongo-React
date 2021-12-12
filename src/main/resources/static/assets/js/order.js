ini();
allOrder();

let list = [];
let listCount = [];

async function ini() {
    let user = await queryGD('GET', userByid + ID);
    document.getElementById('txtSalesMan').value = user.name;
    document.getElementById("txtDate").value = date();
}

async function addProduct() {
    document.getElementById('load_modal').classList.add('show');
    document.getElementById('modal_container').classList.add('show');
    document.getElementById('modalFor').style = 'width:900px';

    document.getElementById('containerModal').innerHTML = ' <div class="row">\n' +
        '            <div class="col-12">\n' +
        '                <div class="card my-4">\n' +
        '                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-4">\n' +
        '                        <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3 flex-column-reverse">\n' +
        '                            <h6 class="text-white text-capitalize ps-3">Products: <strong id="numberProducts"></strong></h6>\n' +
        '                            <div class="align-items-center container-md">\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="card-body px-0 pb-2">\n' +
        '                        <div class="table-responsive p-0">\n' +
        '                            <table class="table align-items-center mb-0" id="tableProductsModal">\n' +
        '                                <thead>\n' +
        '                                <tr>\n' +
        '                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">\n' +
        '                                        Reference\n' +
        '                                    </th>\n' +
        '                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">\n' +
        '                                        Category\n' +
        '                                    </th>\n' +
        '                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">\n' +
        '                                        Description\n' +
        '                                    </th>\n' +
        '                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">\n' +
        '                                        Availability\n' +
        '                                    </th>\n' +
        '                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">\n' +
        '                                        Price\n' +
        '                                    </th>\n' +
        '                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">\n' +
        '                                        Quantity\n' +
        '                                    </th>\n' +
        '                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">\n' +
        '                                        Photography\n' +
        '                                    </th>\n' +
        '                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">\n' +
        '                                        #\n' +
        '                                    </th>\n' +
        '                                    <th class="text-secondary opacity-7"></th>\n' +
        '                                </tr>\n' +
        '                                </thead>\n' +
        '                                <tbody>\n' +
        '\n' +
        '                                </tbody>\n' +
        '                            </table>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="col-12">\n' +
        '                    <button onclick="closeProduct()" type="button" class="btn btn-primary">End up</button>\n' +
        '             </div>' +
        '        </div>';


    const request = await fetch(all_product, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        // location.reload();
    })
    document.getElementById('numberProducts').innerText = list.length;

    const products = await request.json();
    let listHtml = '';
    for (let product of products) {
        let fila = "<tr><td> " + product.reference + "</td>" +
            "<td> " + product.category + "</td>" +
            "<td> " + product.description + "</td>" +
            "<td> " + product.availability + "</td>" +
            "<td> " + product.price + "</td>" +
            "<td> " + product.quantity + "</td>" +
            "<td> " + product.photography + "</td>" +
            "<td>" +
            "<button style=\"color: #48d339\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='add(" + JSON.stringify(product) + ",this" + ")'>Add</button>" +
            "</td>" +
            "</tr>";

        if (!vali(product.reference)) {
            listHtml += fila;
        }
    }

    document.querySelector('#tableProductsModal tbody').outerHTML = listHtml;
    document.getElementById('load_modal').classList.remove('show');
}

async function registerOrder() {
    if (list.length === 0) {
        alert('There are no products in the order');
    } else {
        document.getElementById('load_modal').classList.add('show');
        await queryPT('POST', add_order,
            {
                id: null,
                registerDay: date(),
                status: "Pendiente",
                salesMan: await queryGD('GET', userByid + ID),
                products: listProducts(),
                quantities: listQuantities()
            })
        alert("Registered order");
        location.reload();
    }
}

async function allOrder() {
    const request = await fetch(all_order, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        // location.reload();
    })

    const orders = await request.json();
    let listHtml = '';
    for (let order of orders) {
        let fila = "<tr><td> " + order.salesMan.identification + "</td>" +
            "<td> " + order.salesMan.name + "</td>" +
            "<td> " + order.salesMan.email + "</td>" +
            "<td> " + order.registerDay + "</td>" +
            "<td> " + order.id + "</td>" +
            "<td> " + order.status + "</td>" +
            "<td>" +
            "<button style=\"color: rgba(26,166,243,0.8)\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='getOrder(" + order.id + ")'>Detail</button>" +
            "</td>" +
            "</tr>";

        listHtml += fila;
    }

    document.querySelector('#tableOrder tbody').outerHTML = listHtml;
    document.getElementById('txtNumOrder').innerText = orders.length;
}

async function allProductOrder() {
    let listHtml = '';
    for (let product of list) {
        let fila = "<tr><td> " + product.reference + "</td>" +
            "<td> " + product.category + "</td>" +
            "<td> " + product.description + "</td>" +
            "<td> " + product.price + "</td>" +
            "<td> " + product.photography + "</td>" +
            "<td>" +
            '<div class="input-group input-group-static">\n' +
            "<button style=\"color: rgba(143,143,143,0.8)\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='count(" + JSON.stringify(product) + ")'>Count</button>" +
            '</div>' +
            "</td>" +
            "<td>" +
            "<button style=\"color: rgba(243,26,135,0.8)\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='removeIndex(" + JSON.stringify(product) + ",this" + ")'>Remove</button>" +
            "</td>" +
            "</tr>";

        listHtml += fila;
    }

    document.querySelector('#tableProducts tbody').outerHTML = listHtml;
    document.getElementById('txtNumroduct').innerText = list.length;
}

function closeProduct() {
    closeModal();
    if (list.length !== 0)
        allProductOrder();
}

function closeModal() {
    document.getElementById('modal_container').classList.remove('show');
}

function add(product, btn) {
    list.push(product);
    listCount.push({"name": product.reference, "count": 1});
    document.getElementById('numberProducts').innerText = list.length;
    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function vali(reference) {
    for (let i of list) {
        if (reference === i.reference) {
            return true;
        }
    }
    return false;
}

function removeIndex(product, btn) {
    list.splice(list.indexOf(product), 1)
    listCount.splice(listCountIndex(product.name), 1)
    document.getElementById('txtNumroduct').innerText = list.length;
    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function count(product) {
    document.getElementById('modal_container').classList.add('show');
    document.getElementById('modalFor').style = 'width:500px';
    document.getElementById('titleModal').innerText = 'Product quantity';

    document.getElementById('containerModal').innerHTML =
        ' <div class="row">\n' +
        '            <div class="col-12">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtQuantity" >Num <strong>(required)</strong></label>\n' +
        '                        <input class="form-control" type="number" id="txtCount">\n' +
        '                    </div>\n' +
        '            </div>\n' +
        '            <div class="col-12 mt-2">\n' +
        '                    <button  type="button" id="btnCount" class="btn btn-primary">End up</button>\n' +
        '                    <button onclick="closeModal()" type="button" class="btn btn-secondary">Close</button>\n' +
        '             </div>' +
        '        </div>';

    let index = listCountIndex(product.reference);
    document.getElementById('txtCount').value = listCount[index].count;

    document.getElementById('btnCount').onclick = async function () {
        listCount[index] = {
            "name": product.reference,
            "count": document.getElementById('txtCount').value
        }
        closeModal();
    }
}

function listCountIndex(reference) {
    for (let i = 0; i < listCount.length; i++) {
        if (listCount[i].name === reference) {
            return i;
        }
    }
    return -1;
}

function date() {
    let n = new Date();
    let y = n.getFullYear();
    let m = n.getMonth() + 1;
    let d = n.getDate();

    return y + "-" + m + "-" + d;
}

function listProducts() {
    let json = {}
    for (let product of list) {
        let name = product.reference;
        json[name] = {
            reference: product.reference,
            category: product.category,
            description: product.description,
            availability: product.availability,
            price: product.price,
            quantity: product.quantity,
            photography: product.photography
        }
    }

    return json;
}

function listQuantities() {
    let json = {};
    for (let product of listCount) {
        let name = product.name;
        json[name] = product.count;
    }
    return json;
}

async function getOrder(id) {
    document.getElementById('load_modal').classList.add('show');
    document.getElementById('modal_container').classList.add('show');
    document.getElementById('modalFor').style = 'width:900px';
    document.getElementById('titleModal').innerText = "Order";

    document.getElementById('containerModal').innerHTML = ' <div class="row">\n' +
        '            <div class="col-12">\n' +
        '                <div class="card my-4">\n' +
        '                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-4">\n' +
        '                        <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3 flex-column-reverse">\n' +
        '                            <h6 class="text-white text-capitalize ps-3">Products: <strong id="numberProducts"></strong></h6>\n' +
        '                            <div class="align-items-center container-md">\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="card-body px-0 pb-2">\n' +
        '                        <div class="table-responsive p-0">\n' +
        '                            <table class="table align-items-center mb-0" id="tableProductsModal">\n' +
        '                                <thead>\n' +
        '                                <tr>\n' +
        '                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">\n' +
        '                                        Reference\n' +
        '                                    </th>\n' +
        '                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">\n' +
        '                                        Category\n' +
        '                                    </th>\n' +
        '                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">\n' +
        '                                        Description\n' +
        '                                    </th>\n' +
        '                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">\n' +
        '                                        Availability\n' +
        '                                    </th>\n' +
        '                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">\n' +
        '                                        Price\n' +
        '                                    </th>\n' +
        '                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">\n' +
        '                                        Quantity\n' +
        '                                    </th>\n' +
        '                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">\n' +
        '                                        Photography\n' +
        '                                    </th>\n' +
        '                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">\n' +
        '                                        Quantity\n' +
        '                                    </th>\n' +
        '                                    <th class="text-secondary opacity-7"></th>\n' +
        '                                </tr>\n' +
        '                                </thead>\n' +
        '                                <tbody>\n' +
        '\n' +
        '                                </tbody>\n' +
        '                            </table>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="col-12">\n' +
        '                    <button onclick="closeModal()" type="button" class="btn btn-outline-primary btn-sm ">Close</button>\n' +
        '             </div>' +
        '        </div>';

    let order = await queryGD('GET', orderByid + id);
    let listHtml = '';

    let count = order.quantities;
    let aux = 0;
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

        let fila = "<tr><td> " + order.products[product].reference + "</td>" +
            "<td> " + order.products[product].category + "</td>" +
            "<td> " + order.products[product].description + "</td>" +
            "<td> " + dis + "</td>" +
            "<td> " + order.products[product].price + "</td>" +
            "<td> " + order.products[product].quantity + "</td>" +
            "<td> " + order.products[product].photography + "</td>" +
            "<td> " + countI + "</td>" +
            "</tr>";
        listHtml += fila;
        aux++;
    }

    document.querySelector('#tableProductsModal tbody').outerHTML = listHtml;
    document.getElementById('numberProducts').innerText = aux;


    document.getElementById('load_modal').classList.remove('show');
}
