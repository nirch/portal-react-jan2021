import './PortalButtonSet.css'

function PortalButtonSet(props) {

    const { buttons, handleClick, selectedButton, hasTopBorder } = props;

    const buttonSetView = buttons.map(btn => <button className={selectedButton.key === btn.key ? "selected" : ""} key={btn.key}
        type="button" onClick={() => handleClick(btn)}>{btn.label}</button>);

    return (
        <div className={"c-portal-button-set" + (hasTopBorder ? " hasTopBorder" : "")}>
            {buttonSetView}
        </div>
    );
}

export default PortalButtonSet;