import './EmployeeHoursReports.css'
import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import CustomToggle from './CustomToggle';
import ReportingButtons from './ReportingButtons/ReportingButtons';

// array of reports
// calculate the hours

const EmployeeHoursReports = ({reports}) => {
    const {firstname, lastname, approved, unapproved, rejected } = reports[0];
    const [isAllChecked, setIsAllChecked] = useState(false);


    function onStatusSelect(status){
        console.log(status);
        
        // sending update request to the server
    }

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
            <Accordion.Collapse eventKey="0">
                <div className='report-body'>
                    <div className='mass-buttons'>
                        <div className='check-all radio-group' onClick={() => setIsAllChecked(!isAllChecked)}>
                            <div className='radio'>
                                <div className={isAllChecked ? 'radio-fill-full' : ''}></div>
                            </div>
                            <div className='radio-text'>סמן הכל</div>
                        </div>
                        <div className='mass-approve radio-group'>
                            <div className='radio'></div>
                            <div className='radio-text'>אישור מסומנים</div>
                        </div>
                        <div className='mass-reject radio-group'>
                            <div className='radio'></div>
                            <div className='radio-text'>דחיית מסומנים</div>
                        </div>
                    </div>
                    <ReportingButtons status={-1} onStatusSelect={onStatusSelect}/>
                </div>
            </Accordion.Collapse>
        </div>
    );
}

export default EmployeeHoursReports;