async function profileLogin() {
    const ID = sessionStorage.getItem('id');

    let user = await queryGD('GET', userByid + ID);
    sessionStorage.setItem('type', user.type);
    document.getElementById('nameProfile').innerText = user.name;
    let type = '';
    switch (user.type) {
        case 'ADMIN':
            type = 'Administrador';
            break;
        case 'ASE':
            type = 'Asesor Comercial';
            break;
        case 'COORD':
            type = 'Coordinador de Zona';
            break;
    }
    document.getElementById('typeProfile').innerText = type;
    document.getElementById('emailProfile').innerText = user.email;
    document.getElementById('zoneProfile').innerText = user.zone;
}

function ini() {
    let type = sessionStorage.getItem('type');
    switch (type) {
        case 'ADMIN':
            doOpen('pages/tablesAdmin.html');
            break;
        case 'ASE':
            doOpen('pages/tablesAseProducts.html');
            break;
        case 'COORD':
            doOpen('pages/tablesCoord.html');
            break;
    }
}