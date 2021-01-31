
import React from 'react';
import { useAccordionToggle } from 'react-bootstrap';

const CustomToggle = ({ children, eventKey }) => {
    
    const decoratedOnClick = useAccordionToggle(eventKey, () => {
        console.log('totally custom!');
    });
    
    return (
        <button type="button" onClick={decoratedOnClick}>
            {children}
        </button>
    );
}

export default CustomToggle;