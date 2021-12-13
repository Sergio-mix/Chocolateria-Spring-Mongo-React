import React, {Fragment} from 'react';

const Aside = (props) => {
    return (
        <Fragment>
            <li className="nav-item dropdown pe-2 d-flex align-items-center">
                <a className="nav-link text-body p-0" href={props.url}>
                    <div className={props.status + " border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"}>
                        <i className={"fa fa-" + props.icon + " cursor-pointer m-2"}/>
                        <span className="nav-link-text m-2">{props.name}</span>
                    </div>
                </a>
            </li>
        </Fragment>
    );
}

export default Aside;