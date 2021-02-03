import "./PortalSelect.css";
import imageArrow from "../../assets/images/arrow_right.png";
function PortalSelect(props)
{
  
   let callback=props.handleSelection;
   
   function makeItem(x) 
   {
        return <option key={props.options.indexOf(x)} value={x}>{x} </option>;
   }
  
    return (<div className="portal-select-all">
             <div className="portal-select-title">{props.title}</div>
                <div className="portal-select-selector-wrapper">
                <select className="portal-select-selector" value={props.optionsKey} onChange ={e=> callback(e)} >
                    {props.options.map(makeItem) }  </select>  <span className="portal-select-charV">
                        <img  src={imageArrow}/></span> </div>
    </div>)
}
export default PortalSelect;