import { useState } from 'react';
import './PortalButtonSet.css'

function PortalButtonSet(props) {

    const { buttons } = props;
    const [ selectedButton, setSelectedButton ] = useState(buttons[0]);

    const buttonSetView = buttons.map(btn => <button className={selectedButton.key === btn.key ? "selected" : ""} key={btn.key} type="button">{btn.label}</button>);

    return (
        <div className="c-portal-button-set">
            {buttonSetView}
        </div>
    );
}

export default PortalButtonSet;