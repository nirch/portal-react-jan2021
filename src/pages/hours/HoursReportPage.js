import React, { useContext, useEffect, useState } from 'react';
import './hours.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import { Col, Container, Row, Table } from 'react-bootstrap';
import server from '../../shared/server';
import calculateHours from '../../shared/calculateHours';
import PortalDatePicker from '../../components/portalDatePicker/PortalDatePicker';

const HoursReportPage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);

    const [rowData, setRowData] = useState([]);
    const [allProjectsData, setAllProjectsData] = useState([]);

    const currentDate = new Date();
    const [currentDateObj, setCurrentDateObj] = useState(
        {
            day: currentDate.getDate(),
            month: currentDate.getMonth()+1,
            year: currentDate.getFullYear()
        }
    );

    const handleDateSelection = (newDate) => {
        setCurrentDateObj({ "day": newDate.day, "month": newDate.month, "year": newDate.year });
    }

    useEffect ( () => {
		server(activeUser, {}, 'GetMyReportingPerimeter').then(function (serverData) {
            setAllProjectsData(Object.values(serverData.data));
		});
    },[]);

    useEffect ( () => {
        var data = {
                    month : currentDateObj.month,
                    year : currentDateObj.year
                }
		server(activeUser, data, 'GetReports').then(function (serverData) {
            setRowData(serverData.data);
		});
    },[currentDateObj]);

    if (!activeUser) {
        return <Redirect to='/' />
    }

     const headers = [{key: "date", header: "תאריך"}, 
                      {key: "projectName", header: "פרויקט"},
                      {key: "actionSubjectName", header: "נושא פעילות"},
                      {key: "hours", header: 'סה"כ שעות'}];

    let totalHours =  "0:0";
    if (rowData.length > 0 && allProjectsData.length > 0)
    {
        for (const row of rowData)
        {
            const projectData =  allProjectsData.find(item => item.projectid === row.projectid);   
            row["projectName"] = projectData ?  projectData.projectName : ""; 
            const subject = projectData.subjects.find(item => item.reportsubjectid === row.actionid);  
            row["actionSubjectName"] = subject ? subject.subject : "";   
            row["hours"] = calculateHours(row["starthour"],row["finishhour"]).timeFormat;  
            totalHours = sumHours(totalHours, row["hours"]);   
        }
    }

    function sumHours(interval1, interval2)
    {
        const startHour = interval1.split(":");
        const finishHour = interval2.split(":");      
        const startDate = new Date(0, 0, 0, startHour[0], startHour[1], 0); 
        const hoursLater = new Date(startDate.getTime() + finishHour[0] * 60 * 60 * 1000);
        const allIntervalLater = new Date(hoursLater.getTime() + finishHour[1] * 60 * 1000);
        const dateArr = allIntervalLater.toString().split(" ");
        return dateArr[4].substring(0, 5);   
    }

    const tableHdr = headers.map((item, index) => <Col className="table-hdr" key={index}>{item.header}</Col>)
   
    const tableRows = rowData.map(( row, index) => 
        <Row className={`margin  ${row.approval === "-1" ? "rejected" : (row.approval === "1" ? "approved" : "waiting")}`}>
            {headers.map((item, index) => <Col  key={index}>{row[item.key]}</Col>)}
        </Row>
    );

    return (
        <div className="p-hours-report">
            <PortalNavbar handleLogout={handleLogout} headLine="דיווח שעות"/>
            <PortalDatePicker date={currentDateObj} handleDateSelection={handleDateSelection} onlyMonth={true} stepsLimit={6} ></PortalDatePicker>
            {(rowData.length > 0 && allProjectsData.length > 0) ?
            <Container >
                <p className="center margin">סה"כ שעות: {totalHours}</p>
            <Row>
                {tableHdr}
            </Row>
                {tableRows}
            </Container>
            :
            <>
            </>}
            <div className="footer">
                <div className="circle"  >
                    <span className="circle-plus">+</span>
                </div>
            </div>
        </div>

    );
}

export default HoursReportPage;