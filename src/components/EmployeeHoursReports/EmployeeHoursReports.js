import './EmployeeHoursReports.css'
import React from 'react';
import { Accordion } from 'react-bootstrap';
import CustomToggle from './CustomToggle';

// array of reports
// calculate the hours

const EmployeeHoursReports = ({reports}) => {
    const {firstname, lastname, approved, unapproved, rejected } = reports[0];

    return (
        <div className='c-employee-hours-reports'>
            <CustomToggle eventKey="0">
                <div className='employee-name'>{firstname} {lastname}</div>
                <div className='hours'>
                    <div className='unapproved'>{unapproved}</div>
                    <div className='approved'>{approved}</div>
                    <div className='rejected'>{rejected}</div>
                    <div className='total'>{unapproved+approved+rejected}</div>
                </div>
                <div className='arrow'></div>
            </CustomToggle>
            <Accordion.Collapse className='report-body' eventKey="0">
                <div className='mass-buttons'>
                    <div className='check-all radio-group'>
                        <div className='radio'></div>
                        <div className='radio-text'>סמן הכל</div>
                    </div>
                    <div className='mass-approve radio-group'>
                        <div className='radio'></div>
                        <div className='radio-text'>אישור מסומנים</div>
                    </div>
                    <div className='mass-deny radio-group'>
                        <div className='radio'></div>
                        <div className='radio-text'>דחיית מסומנים</div>
                    </div>
                </div>
            </Accordion.Collapse>
        </div>
    );
}

export default EmployeeHoursReports;