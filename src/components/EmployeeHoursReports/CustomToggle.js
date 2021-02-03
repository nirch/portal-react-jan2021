
import { useAccordionToggle } from 'react-bootstrap';

const CustomToggle = ({ children, eventKey, toggleClicked }) => {
    
    const decoratedOnClick = useAccordionToggle(eventKey, () => {
        toggleClicked();
    });
    
    return (
        <button className='report-header' type="button" onClick={decoratedOnClick}>
            {children}
        </button>
    );
}

export default CustomToggle;