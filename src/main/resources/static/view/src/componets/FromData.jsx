import React, {Fragment} from 'react';

const FormData = (props) => {
    let list = [];
    for (let input of props.data) {
        if (input.type !== "select") {
            list.push(
                <div className={"col-md-" + input.size}>
                    <label>{input.title} <strong>{"(" + input.status + ")"}</strong></label>
                    <input id={input.name} className="form-control" type={input.type}/>
                </div>
            );
        } else {
            let op = [];
            for (let option of input.option) {
                op.push(<option value={option.value}>{option.name}</option>)
            }
            list.push(
                <div className={"col-md-" + input.size}>
                    <label>{input.title}</label>
                    <select id={input.name} className="form-control">
                        {op}
                    </select>
                </div>
            );
        }
    }

    const data = () => {
        let dt = [];
        for (let info of props.data) {
            dt.push({name: info.name, value: document.getElementById(info.name).value})
        }
        props.event(dt)
    }

    return (
        <Fragment>
            {list}
            <button onClick={(data)}>s</button>
        </Fragment>
    );
}

export default FormData;