export const columnsUser = [
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

export let userListData = [
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

export const columnsProduct = [
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
    }, {
        column: "Availability",
        value: "availability_table"
    },
    {
        column: "Quantity",
        value: "quantity"
    }
];

export let productListData = [
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
];

export const columnsOrder = [
    {
        column: "Id user",
        value: "salesMan_identification"
    }, {
        column: "Names",
        value: "salesMan_name"
    },
    {
        column: "Email",
        value: "salesMan_email"
    }, {
        column: "Date",
        value: "registerDay"
    },
    {
        column: "Id Order",
        value: "id"
    },
    {
        column: "Status",
        value: "status"
    }
];

export const columnsProductOrder = [
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
    },
    {
        column: "Price",
        value: "price"
    },
    {
        column: "Quantity",
        value: "quantity"
    }
];

export const columnsOrderProduct = columnsProductOrder;

export let formCount = [
    {
        size: "12",
        title: "Count",
        name: "count_order",
        status: "required",
        type: "number"
    }
]


