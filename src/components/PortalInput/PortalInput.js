import { useMemo } from "react";
import "./PortalInput.css";
function PortalInput(props)
{
    let callback=props.handleChange;
    const randomNumber= useMemo(() => "portal-input-"+Math.floor((Math.random() * 1000000) + 1), []);

    const title= <label  htmlFor={randomNumber} className="portal-input-title">{props.title}</label>
    return (<div className="portal-input"> 
                  {props.title?title:""}
                 <input  id={randomNumber} type="text" placeholder={props.placeholder} className="portal-input-text" 
                 value={props.value}
                 onChange ={e=> callback(e)} />
            </div>)
}
export default PortalInput;