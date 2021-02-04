import React, { useContext, useEffect, useState } from 'react';
import './hours.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import EmployeeHoursReports from '../../components/EmployeeHoursReports/EmployeeHoursReports';
import { Accordion } from 'react-bootstrap';
import server from '../../shared/server';
import PortalDatePicker from '../../components/portalDatePicker/PortalDatePicker';

const HoursApprovePage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    const [data, setData] = useState('');
    const [openEmployee, setOpenEmployee] = useState('');
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        async function getReports(){
            const month = date.getMonth()+1;
            const year = date.getFullYear();
            
            const res = await server(activeUser, {month, year}, 'GetAllReporters');
            const dataObj = res.data.reduce((employee, item) => {
                return {
                    ...employee,
                    [item['userid']]: item,
                  };
                }, {});
                setData(dataObj);
            }
            getReports();
    },[date])
    
    async function handleReporting(empId, status, reportids){
        
        const checkdate2 = true;

        const res = await server(activeUser, {reportids, checkdate2, status}, 'SetReportApproval');
        if (res.status === 200){
            const newEmp = {...data[empId]};
            newEmp.reports.forEach(report => {
                if (reportids.includes(report.reportid)) {
                    report.approval = status.toString();
                }
            });
            const newData = {...data};
            newData[empId] = newEmp;
            setData(newData);
        }
    }

    function onDateChange (dateObj) {
        const {day, month, year} = dateObj;
        setDate(new Date(year, month-1, day));
    }

    function onEmployeeSelect(empId){
        openEmployee !== empId ? setOpenEmployee(empId) : setOpenEmployee('');
    }
     
    const employeesView = data && Object.keys(data).map(employee => {
        if (data[employee].reports.length > 0) {
        return <EmployeeHoursReports data={data[employee]} key={employee} handleReporting={handleReporting} 
            openEmployee={openEmployee === employee} onEmployeeSelect={() => onEmployeeSelect(employee)}/>
        }
    });

    const [month, day, year] = date.toLocaleDateString("en-US").split("/");

    if (!activeUser) {
        return <Redirect to='/' />
    }

    return (
        <div className="p-hours-approve">
            <PortalNavbar handleLogout={handleLogout}/>
            <h1>אישור שעות</h1>
            <PortalDatePicker onlyMonth={true} handleDateSelection={onDateChange} date={{year, month, day}}/>
            <Accordion>
                {employeesView}
            </Accordion>
        </div>
    );
}

export default HoursApprovePage;