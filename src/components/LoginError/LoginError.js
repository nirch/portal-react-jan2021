import React from 'react';
import "./LoginError.css";
import {  Button } from 'react-bootstrap'

import ErrorImage from "../../assets/Login/Pictures/err.svg";
function LoginError(props)
{
    const errorLoginDiv= 
    <div  className="login-err">
        <img src={ErrorImage}  alt="error"/>
        <div className="login_error_message"> {props.message}</div> 
        <Button className="login-error-close-button" type="button" onClick={props.close} >&#10006;</Button>
    </div >;


    return (<div>
            {props.message? errorLoginDiv:""}
    </div>);
}
export default LoginError;