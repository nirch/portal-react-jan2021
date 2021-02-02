import React, { useContext, useEffect, useState } from 'react';
import './hours.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import EmployeeHoursReports from '../../components/EmployeeHoursReports/EmployeeHoursReports';
import { Accordion } from 'react-bootstrap';
import server from '../../shared/server';

const HoursApprovePage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    const [data, setData] = useState('');

    useEffect(() => {
        async function getReports(){
            const today = new Date();
            const month = today.getMonth()+1;
            const year = today.getFullYear();
            
            const res = await server(activeUser, {month, year}, 'GetAllReporters');
            setData(res.data);
        }
        getReports();
    },[])

    const employeesView = data && data.map((employee) => {
        if (employee.reports.length > 0) {
        return <EmployeeHoursReports data={employee} key={employee.userid}/>
        }
    });


    if (!activeUser) {
        return <Redirect to='/' />
    }

    return (
        <div className="p-hours-approve">
            <PortalNavbar handleLogout={handleLogout}/>
            <h1>אישור שעות</h1>
            <Accordion>
                {employeesView}
            </Accordion>
        </div>
    );
}

export default HoursApprovePage;