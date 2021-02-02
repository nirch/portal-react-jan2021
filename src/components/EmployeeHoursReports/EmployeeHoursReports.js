import './EmployeeHoursReports.css'
import React, { useMemo, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import CustomToggle from './CustomToggle';
import ReportingButtons from './ReportingButtons/ReportingButtons';
import ReportDetails from './ReportDetails/ReportDetails';
import arrow from '../../assets/images/arrow_left.png';
import calculateHours from '../../shared/calculateHours';

// array of reports
// calculate the hours

const EmployeeHoursReports = ({data}) => {
    const {firstname, lastname, reports, reportingPerimeter } = data;
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isOpen, setIsOpen] = useState('');
    let approved = 0, unapproved = 0, rejected = 0;

    reports.map(report => {
        const hours = calculateHours(report.starthour, report.finishhour).numberFormat;
        if (report.approval === '-1') {
            rejected += hours
        } else if (report.approval === '0') {
            unapproved += hours
        } else if (report.approval === '1') {
            approved += hours
        }
    });

    function onStatusSelect(status){
        console.log(status);
        
        // sending update request to the server
    }

    const arrowAnimationStyle = useMemo(() => {
        if (isOpen === '') {
            return ''
        } else if (isOpen) {
            return 'spin-up'
        } else {
            return 'spin-down'
        }
    },[isOpen]);

    function toggleClicked(){
        setIsOpen(!isOpen);
    }

    const reportsView = reports && reports.map(report => 
        <div key={report.reportid}>
            <ReportingButtons status={report.approval} onStatusSelect={onStatusSelect}/>
            <ReportDetails status={report.approval} checked={false} report={report} reportingPerimeter={reportingPerimeter}/>
        </div>
    );

    return (
        <div className='c-employee-hours-reports'>
            <CustomToggle eventKey={data.userid} toggleClicked={toggleClicked}>
                <div className='employee-name'>{firstname} {lastname}</div>
                <div className='total-hours'>
                    <div className='unapproved'>{unapproved}</div>
                    <div className='approved'>{approved}</div>
                    <div className='rejected'>{rejected}</div>
                    <div className='total'>{unapproved+approved+rejected}</div>
                </div>
                <div className='arrow'><img className={arrowAnimationStyle} src={arrow} alt='arrow'/></div>
            </CustomToggle>
            <Accordion.Collapse eventKey={data.userid}>
                <div className='report-body'>
                    <div className='mass-buttons'>
                        <div className='check-all radio-group' onClick={() => setIsAllChecked(!isAllChecked)}>
                            <div className='radio'>
                                <div className={isAllChecked ? 'radio-fill' : ''}></div>
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
                    {reportsView}
                </div>
            </Accordion.Collapse>
        </div>
    );
}

export default EmployeeHoursReports;