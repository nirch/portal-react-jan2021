import React from 'react';
import "./PortalAlert.css";
import {  Button } from 'react-bootstrap'

import ErrorImage from "../../assets/Login/Pictures/err.svg";
import InfoImage from "../../assets/Login/Pictures/info.png";
import enums from "../../shared/enums";
function PortalAlert(props)
{
   
    let image=props.type===enums.alertType.ERROR_TYPE?ErrorImage:InfoImage;
    let messageClass=props.type===enums.alertType.ERROR_TYPE? "alert_message alert_error_color ":"alert_message alert_info_color  "
    
    const alertDiv= 
    <div  className="portal_alert">
        <div className="alert-line-wrap">
            <img src={image}  alt="Message"/>
            <div className={messageClass}> {props.message}</div> 
        </div>
        <Button className="alert-close-button" type="button" onClick={props.close} >&#10006;</Button>
    </div>;
   

    return (<div>
            {props.message? alertDiv:null}
    </div>);
}
export default PortalAlert;