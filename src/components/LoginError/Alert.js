import React from 'react';
import "./Alert.css";
import {  Button } from 'react-bootstrap'

import ErrorImage from "../../assets/Login/Pictures/err.svg";
function Alert(props)
{
    const errorDiv= 
    <div  className="login-err">
        <img src={ErrorImage}  alt="error"/>
        <div className="login_error_message"> {props.message}</div> 
        <Button className="login-error-close-button" type="button" onClick={props.close} >&#10006;</Button>
    </div >;


    return (<div>
            {props.message? errorDiv:""}
    </div>);
}
export default Alert;