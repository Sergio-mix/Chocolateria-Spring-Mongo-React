import React, {Fragment, useState} from 'react';
import Modal from "./Modal";

const ModalForm = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Fragment>
            <div className="m-2">
                <button className="btn btn-simple m-2" onClick={handleShow}>{props.title}</button>
            </div>

            <Modal show={show} title={props.title} container={[props.form,
                <button className="close" onClick={handleClose}>&times;</button>]}/>
        </Fragment>
    )
}

export default ModalForm;