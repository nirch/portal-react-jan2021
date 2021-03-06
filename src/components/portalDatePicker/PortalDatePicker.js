
import { useState } from 'react';
import './PortalDatePicker.css';

function PortalDatePicker(props) {
    const { date, handleDateSelection, onlyMonth, stepsLimit } = props;
    const [ stepsCount, setStepsCount ] = useState(0);

    const Months=["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];

    const stepsLimitDefault = 6;

    function handleClick(step) {
        let newDate = date ? new Date(date.year + "-" + date.month + "-" + date.day) : new Date();
        if (onlyMonth) {
            newDate.setMonth(newDate.getMonth() + step);
        } else {
            newDate.setDate(newDate.getDate() + step);
        }

        const newDateObj = {
            "day": newDate.getDate(),
            "month": newDate.getMonth() + 1,
            "year": newDate.getFullYear()
        }
        setStepsCount(stepsCount + step);

        handleDateSelection(newDateObj);
    }

    const isDisabled = (nextStep) => {
        if (onlyMonth) {

           return ((Math.abs(stepsCount + nextStep)) > (stepsLimit ? stepsLimit : stepsLimitDefault));
        }

        return false;
    }

    function pad(s) { return (s < 10) ? '0' + s : s; }

    const dateView = () => {

        const cDate = date ? new Date(date.year + "-" + date.month + "-" + date.day) : new Date();

        if (onlyMonth) {
            return Months[cDate.getMonth()] + " " + cDate.getFullYear();
        }
        
        return [pad(cDate.getDate()), pad(cDate.getMonth() + 1), cDate.getFullYear()].join('/');
        
    }

    return (
        <div className="c-portal-date-picker">
            <button type="button" className="button-next" onClick={() => handleClick(-1)} disabled={isDisabled(-1)}></button>
                <div className="date-view">{dateView()}</div>
            <button type="button" className="button-back" onClick={() => handleClick(1)} disabled={isDisabled(1)}></button>
        </div>
    );
}

export default PortalDatePicker;