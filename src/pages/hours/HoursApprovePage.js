import React, { useContext, useEffect, useState } from 'react';
import './hours.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import EmployeeHoursReports from '../../components/EmployeeHoursReports/EmployeeHoursReports';
import { Accordion } from 'react-bootstrap';
import server from '../../shared/server';
import PortalDatePicker from '../../components/portalDatePicker/PortalDatePicker';
import PortalSearchPager from '../../components/PortalSearchPager/PortalSearchPager';

const HoursApprovePage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    const [data, setData] = useState('');
    const [openEmployee, setOpenEmployee] = useState('');
    const [date, setDate] = useState(new Date());
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);

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
        setPage(1);
    }

    function onEmployeeSelect(empId){
        openEmployee !== empId ? setOpenEmployee(empId) : setOpenEmployee('');
    }

    function filterData() {
        const filterArr = filter.split(' ');
        const filteredData = Object.values(data).filter(employee => {
            const hasReports = employee.reports.length > 0;

            if (filterArr.length === 0 && hasReports) {
                return true
            } else if (hasReports) {
                for (let i = 0; i < filterArr.length ; i++) {
                    return (data[employee.userid].lastname.includes(filterArr[i]) || data[employee.userid].firstname.includes(filterArr[i]))
                }
            }
        });
        return filteredData
    }

    const filteredData = data && filterData();
     
    // using slice to show only 15 employees in page
    const employeesView = filteredData && filteredData.slice((page-1)*15,page*15).map(employee => {
        const empId = employee.userid;

        return <EmployeeHoursReports data={data[empId]} key={empId} handleReporting={handleReporting} 
            openEmployee={openEmployee === empId} onEmployeeSelect={() => onEmployeeSelect(empId)}/>
    });

    const [month, day, year] = date.toLocaleDateString("en-US").split("/");

    if (!activeUser) {
        return <Redirect to='/' />
    }

    return (
        <div className="p-hours-approve">
            <PortalNavbar handleLogout={handleLogout} haedline='אישור שעות'/>
            <PortalDatePicker onlyMonth={true} handleDateSelection={onDateChange} date={{year, month, day}}/>
            <div className='search-wrapper'>
                <PortalSearchPager placeholder='חיפוש עובד' handleSearch={setFilter} pagesNumber={Math.ceil(filteredData.length / 15)} 
                    currentPage={page} pageChange={setPage}/>
            </div>
            <Accordion>
                {employeesView}
            </Accordion>
        </div>
    );
}

export default HoursApprovePage;