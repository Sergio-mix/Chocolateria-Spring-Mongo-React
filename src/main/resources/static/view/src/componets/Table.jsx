import React, {Fragment} from 'react';
import ModalForm from "./ModalForm";

const Table = (props) => {
    let add = [];
    if (props.add.status) {
        add.push(<ModalForm title={props.add.name} form={props.add.form} event={props.add.event}/>)
    }

    function onEvent(item) {
        let event = [];
        if (props.event.indexOf('update') !== -1) {
            event.push(props.onEdit && (
                <button onClick={ev => props.onEdit(item)}
                        className="btn btn-simple m-2 text-color-yellow">Editar</button>));
        }

        if (props.event.indexOf('remove') !== -1) {
            event.push(props.onDelete && (
                <button onClick={ev => props.onDelete(item)}
                        className="btn btn-simple m-2 text-color-red">Eliminar</button>));
        }

        if (props.event.indexOf('detail') !== -1) {
            event.push(props.onDelete && (
                <button onClick={ev => props.onDelete(item)}
                        className="btn btn-simple m-2 text-color-blue">Detalle</button>));
        }

        return event
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12">
                    <div className="content mb-4">
                        <div className="card-header pb-0">
                            <h6>{props.name}</h6>
                        </div>
                        <div>
                            {add}
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                    <tr>
                                        {props.columns.map((col, index) => (
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                                key={index} scope="col">{col.column}</th>
                                        ))}

                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                            scope="col">#
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        props.data.length > 0 && props.data.map((item, index) => (
                                            <tr key={index}>
                                                {props.columns.map((col, index) => (
                                                    <td key={index}>{item[col.value]}</td>
                                                ))}
                                                <td>
                                                    {onEvent(item)}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Table;