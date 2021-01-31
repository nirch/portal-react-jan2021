import { useState } from 'react';
import './PortalButtonSet.css'

function PortalButtonSet(props) {

    const { buttons, handleClick } = props;
    const [ selectedButton, setSelectedButton ] = useState(buttons[0]);

    const onSelect = (btn) => { 
        setSelectedButton(btn);
        handleClick(btn);
    };

    const buttonSetView = buttons.map(btn => <button className={selectedButton.key === btn.key ? "selected" : ""} key={btn.key} type="button" onClick={() => onSelect(btn)}>{btn.label}</button>);

    return (
        <div className="c-portal-button-set">
            {buttonSetView}
        </div>
    );
}

export default PortalButtonSet;