async function allProducts(status) {
    const request = await fetch(all_product, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        // location.reload();
    })

    const products = await request.json();
    let listHtml = '';
    for (let product of products) {
        let fila = '';
        if (status) {
            fila = "<tr><td> " + product.reference + "</td>" +
                "<td> " + product.category + "</td>" +
                "<td> " + product.description + "</td>" +
                "<td> " + product.availability + "</td>" +
                "<td> " + product.price + "</td>" +
                "<td> " + product.quantity + "</td>" +
                "<td> " + product.photography + "</td>" +
                "<td>" +
                "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
                "onclick='updateProduct(" + JSON.stringify(product.reference) + ")'>Update</button>" +
                "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
                "onclick='deleteProduct(" + JSON.stringify(product.reference) + ")'>" +
                "Remove</button>" +
                "</td>" +
                "</tr>";
        } else {
            fila = "<tr><td> " + product.reference + "</td>" +
                "<td> " + product.category + "</td>" +
                "<td> " + product.description + "</td>" +
                "<td> " + product.price + "</td>" +
                "<td> " + product.quantity + "</td>" +
                "<td> " + product.photography + "</td>" +
                "</tr>";
        }

        listHtml += fila;
    }

    document.querySelector('#tableProducts tbody').outerHTML = listHtml;
    document.getElementById('numberProducts').innerText = products.length;
}

function deleteProduct(reference) {
    document.getElementById('modal_container').classList.add('show');
    document.getElementById('titleModal').innerText = 'Remove Product';
    document.getElementById('containerModal').innerHTML =
        '<div class="row g-3 modal-dialog-scrollable navbar-nav-scroll">\n' +
        '                 <div class="col-8 mx-auto">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtPasswordUser" >Current password</label>\n' +
        '                        <input class="form-control" type="password" id="txtPasswordUser">\n' +
        '                    </div>\n' +
        '                  </div>' +
        '            <div class="col-12">\n' +
        '                    <button id="onClickUserRemove" type="button" class="btn btn-primary">Remove</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '             </div>' +
        '</div>';

    document.getElementById('onClickUserRemove').onclick = async function () {
        let password = document.getElementById('txtPasswordUser').value;
        if (password !== '') {
            document.getElementById('load_modal').classList.add('show');
            let res = await user_login(EMAIL, password);

            if (res.id !== null) {
                await queryGD('DELETE', remove_product + reference);
                let us = await queryGD('GET', productByid + reference);

                if (us === undefined) {
                    document.getElementById('load_modal').classList.remove('show');
                    document.getElementById('modal_container').classList.remove('show');
                    alert('Product Deleted');
                    await allProducts();
                } else {
                    document.getElementById('load_modal').classList.remove('show');
                    alert('Could not delete user')
                }

            } else {
                document.getElementById('load_modal').classList.remove('show');
                alert('Incorrect password');
            }
        } else {
            document.getElementById('load_modal').classList.remove('show');
            alert('Please enter the password');
        }
    }
}

async function updateProduct(id) {
    fromProduct('Update Product');

    let pr = await queryGD('GET', productByid + id);
    let reference = pr.reference;
    document.getElementById('txtCategory').value = pr.category;
    document.getElementById('txtAvailability').value = pr.availability;
    document.getElementById('txtPrice').value = pr.price;
    document.getElementById('txtQuantity').value = pr.quantity;
    document.getElementById('txtPhotography').value = pr.photography;
    document.getElementById('txtDescription').value = pr.category;

    document.getElementById('onClickUpdateUser').onclick = async function () {
        let category = document.getElementById('txtCategory').value;
        let availability = document.getElementById('txtAvailability').value;
        let price = document.getElementById('txtPrice').value;
        let quantity = document.getElementById('txtQuantity').value;
        let photography = document.getElementById('txtPhotography').value;
        let description = document.getElementById('txtDescription').value;
        let pass = document.getElementById('txtPasswordUser').value;

        if (category !== ''
            && availability !== ''
            && price !== ''
            && quantity !== ''
            && photography !== ''
            && description !== ''
            && pass !== ''
            && description.length <= 80) {
            document.getElementById('load_modal').classList.add('show');
            let res = await user_login(EMAIL, pass);
            if (res.id !== null) {
                await queryPT('PUT', product_update, {
                    reference: reference,
                    category: category,
                    availability: availability,
                    price: price,
                    quantity: quantity,
                    photography: photography,
                    description: description
                }).then(async e => {
                    document.getElementById('load_modal').classList.remove('show');
                    document.getElementById('modal_container').classList.remove('show');
                    alert('Updated product');
                    await allProducts();
                });
            } else {
                document.getElementById('load_modal').classList.remove('show');
                alert('Incorrect password');
            }
        } else {
            document.getElementById('load_modal').classList.remove('show');
            alert('Invalid input values');
        }
    }
}

function registerProduct() {
    fromProduct('Register Product');

    document.getElementById('onClickUpdateUser').onclick = async function () {
        let category = document.getElementById('txtCategory').value;
        let availability = document.getElementById('txtAvailability').value;
        let price = document.getElementById('txtPrice').value;
        let quantity = document.getElementById('txtQuantity').value;
        let photography = document.getElementById('txtPhotography').value;
        let description = document.getElementById('txtDescription').value;
        let pass = document.getElementById('txtPasswordUser').value;

        if (category !== ''
            && availability !== ''
            && price !== ''
            && quantity !== ''
            && photography !== ''
            && description !== ''
            && pass !== ''
            && description.length <= 80) {
            document.getElementById('load_modal').classList.add('show');
            let res = await user_login(EMAIL, pass);
            if (res.id !== null) {
                await queryPT('POST', add_product, {
                    category: category,
                    availability: availability,
                    price: price,
                    quantity: quantity,
                    photography: photography,
                    description: description
                }).then(async e => {
                    document.getElementById('load_modal').classList.remove('show');
                    document.getElementById('modal_container').classList.remove('show');
                    alert('Product created');
                    await allProducts();
                });
            } else {
                document.getElementById('load_modal').classList.remove('show');
                alert('Incorrect password');
            }
        } else {
            document.getElementById('load_modal').classList.remove('show');
            alert('Invalid input values');
        }
    }
}

function fromProduct(title) {
    document.getElementById('modal_container').classList.add('show');
    document.getElementById('titleModal').innerText = title;
    document.getElementById('containerModal').innerHTML =
        '<div class="row g-3 modal-dialog-scrollable navbar-nav-scroll">\n' +
        '                <div class="col-md-6">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtCategory" >Category <strong>(required)</strong></label>\n' +
        '                        <input class="form-control" type="text" id="txtCategory">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtAvailability" >Availability</label>\n' +
        '                        <select class="form-control" id="txtAvailability">' +
        '                            <option value="true">Si</option>' +
        '                            <option value="false">No</option>' +
        '                        </select>\n' +
        '                    </div>\n' +
        '                </div>' +
        '                <div class="col-6">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtPrice" >Price <strong>(required)</strong></label>\n' +
        '                        <input class="form-control" type="number" id="txtPrice">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtQuantity" >Quantity <strong>(required)</strong></label>\n' +
        '                        <input class="form-control" type="text" id="txtQuantity">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtPhotography" >Photography <strong>(required)</strong></label>\n' +
        '                        <input class="form-control" type="text" id="txtPhotography">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-12">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtDescription" >Description <strong>(required)</strong></label>\n' +
        '                        <textarea class="form-control" id="txtDescription"></textarea>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-12">\n' +
        '                    <div class="form-group label-floating">\n' +
        '                    <div class="input-group input-group-static">\n' +
        '                        <label for="txtPasswordUser" >Current password</label>\n' +
        '                        <input class="form-control" type="password" id="txtPasswordUser">\n' +
        '                    </div>\n' +
        '                    </div>\n' +
        '                </div>' +
        '            <div class="col-12">\n' +
        '                    <button id="onClickUpdateUser" type="button" class="btn btn-primary">' + title + '</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '             </div>' +
        '</div>';
}