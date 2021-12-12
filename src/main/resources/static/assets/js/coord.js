ini();

async function ini() {
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

        let st = '';
        if (order.status === 'Aprobada') {
            st = "        <option value=\"Pendiente\">Pendiente</option>\n" +
                "        <option value=\"Aprobada\" selected>Aprobada</option>\n";
        } else {
            st = "        <option value=\"Pendiente\" selected>Pendiente</option>\n" +
                "        <option value=\"Aprobada\">Aprobada</option>\n";
        }

        let fila = "<tr><td> " + order.salesMan.identification + "</td>" +
            "<td> " + order.salesMan.name + "</td>" +
            "<td> " + order.salesMan.email + "</td>" +
            "<td> " + order.registerDay + "</td>" +
            "<td> " + order.id + "</td>" +
            "<td> " +
            '<div class="input-group input-group-static">\n' +
            "   <select  onclick='statusValue(" + order.id + ",value" + ")' class=\"form-control\">\n" +
            st +
            "    </select>" +
            "</div>" +
            "</td>" +
            "</tr>";

        listHtml += fila;
    }

    document.querySelector('#tableOrder tbody').outerHTML = listHtml;
    document.getElementById('numberOrder').innerText = orders.length;
}

async function statusValue(id, value) {
    document.getElementById('load_modal').classList.add('show');
    await queryPT('PUT', order_update, {id: id, status: value});
    document.getElementById('load_modal').classList.remove('show');
}