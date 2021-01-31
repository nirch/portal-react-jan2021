import './PortalButtonSet.css'

function PortalButtonSet(props) {

    const { buttons } = props;

    const buttonSetView = buttons.map(btn => <button key={btn.key} type="button">{btn.label}</button>);

    return (
        <div className="c-portal-button-set">
            {buttonSetView}
        </div>
    );
}

export default PortalButtonSet;