import './EmployeeHoursReports.css'
import React, { useContext, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import ReportingButtons from './ReportingButtons/ReportingButtons';
import ReportDetails from './ReportDetails/ReportDetails';
import arrow from '../../assets/images/arrow_left.png';
import calculateHours from '../../shared/calculateHours';


const EmployeeHoursReports = ({data, handleReporting, openEmployee, onEmployeeSelect}) => {
    const {firstname, lastname, reports, reportingPerimeter } = data;
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isOpen, setIsOpen] = useState('');
    const [checkedReports, setCheckedReports] = useState([]);
    
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

    function onReportSelectChange(reportId) {
        const newArray = [...checkedReports];
        const index = newArray.indexOf(reportId);
        
        if (index !== -1) {
            newArray.splice(index, 1);
        } else {
            newArray.push(reportId);
        }
        
        setCheckedReports(newArray);
    }
    
    function onAllReportsSelectChange(){
        const newArray = reports.map(report => report.reportid);
        isAllChecked ? setCheckedReports([]) : setCheckedReports(newArray);
        setIsAllChecked(!isAllChecked);

    }

    function onReporting(status, reportids){
        handleReporting(data.userid, status, reportids);
    }

    function handleEmployeeSelect() {
        onEmployeeSelect();
        setIsOpen(!isOpen);
    }

    let arrowAnimationStyle;
    if (isOpen === '' && !openEmployee) {
        arrowAnimationStyle = '';
    } else if (isOpen && openEmployee) {
        arrowAnimationStyle = 'spin-up';
    } else if (isOpen && !openEmployee) {
        setIsOpen(false);
        arrowAnimationStyle = 'spin-down';
    } else if (!isOpen && !openEmployee) {
        arrowAnimationStyle = 'spin-down';
    }

    reports && reports.sort((a,b) => {
        const aDate = a.date.split('/')[0];
        const bDate = b.date.split('/')[0];
        return (aDate - bDate);
    });

    const reportsView = reports && reports.map(report => 
        <div key={report.reportid}>
            <ReportingButtons status={report.approval} onStatusSelect={onReporting} id={report.reportid}/>
            <ReportDetails status={report.approval} checked={checkedReports.indexOf(report.reportid) !== -1 ? true : false} 
            report={report} reportingPerimeter={reportingPerimeter} onReportSelectChange={() => {onReportSelectChange(report.reportid)}}/>
        </div>
    );

    return (
        <div className='c-employee-hours-reports'>
            <Accordion.Toggle eventKey={data.userid} className='report-header' onClick={handleEmployeeSelect}>
                <div className='employee-name'>{firstname} {lastname}</div>
                <div className='total-hours'>
                    <div className='unapproved'>{unapproved}</div>
                    <div className='approved'>{approved}</div>
                    <div className='rejected'>{rejected}</div>
                    <div className='total'>{unapproved+approved+rejected}</div>
                </div>
                <div className='arrow'><img className={arrowAnimationStyle} src={arrow} alt='arrow'/></div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={data.userid}>
                <div className='report-body'>
                    <div className='mass-buttons'>
                        <div className='check-all radio-group' onClick={onAllReportsSelectChange}>
                            <div className='radio'>
                                <div className={isAllChecked ? 'radio-fill' : ''}></div>
                            </div>
                            <div className='radio-text'>סמן הכל</div>
                        </div>
                        <div className='mass-approve radio-group' onClick={() => {onReporting(1, checkedReports)}}>
                            <div className='radio'></div>
                            <div className='radio-text'>אישור מסומנים</div>
                        </div>
                        <div className='mass-reject radio-group' onClick={() => {onReporting(-1, checkedReports)}}>
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