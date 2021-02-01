import './PortalDatePicker.css';

function PortalDatePicker(props) {
    const { date, handleDateSelection } = props;

    function handleClick(step) {
        let newDate = date ? new Date(date.year + "-" + date.month + "-" + date.day) : new Date();
        newDate.setDate(newDate.getDate() + step);
        const newDateObj = {
            "day": newDate.getDate(),
            "month": newDate.getMonth() + 1,
            "year": newDate.getFullYear()
        }

        handleDateSelection(newDateObj);
    }

    function pad(s) { return (s < 10) ? '0' + s : s; }

    const dateView = () => {

        const cDate = date ? new Date(date.year + "-" + date.month + "-" + date.day) : new Date();
        return [pad(cDate.getDate()), pad(cDate.getMonth() + 1), cDate.getFullYear()].join('/');
    }

    return (
        <div className="c-portal-date-picker">
            <button type="button" className="button-next" onClick={() => handleClick(1)}>&lt;</button>{dateView()}<button type="button" className="button-back" onClick={() => handleClick(-1)}>&gt;</button>
        </div>
    );
}

export default PortalDatePicker;