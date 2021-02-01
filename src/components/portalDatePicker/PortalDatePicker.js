import './PortalDatePicker.css';

function PortalDatePicker(props) {
    const { date } = props;

    const dateView = () => {
        const cDate = new Date(date.year, date.month, date.day);
        const dd = String(cDate.getDate()).padStart(2, '0');
        const mm = String(cDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = cDate.getFullYear();
        const vdate =  mm + '/' + dd + '/' + yyyy;
        return vdate;
    }
     
    return(
        <div className="c-portal-date-picker">
            <button type="button" className="button-next">&lt;</button>{ dateView() }<button type="button" className="button-back">&gt;</button>
        </div>
    );
}

export default PortalDatePicker;