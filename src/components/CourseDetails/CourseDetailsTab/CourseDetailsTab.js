import { useState } from "react";
import PortalInput from "../../PortalInput/PortalInput";
import PortalSelect from "../../PortalSelect/PortalSelect";
import  { useEffect } from 'react';
import { useParams } from "react-router-dom";
import ActiveUserContext from "../../../shared/activeUserContext";
import { Redirect } from 'react-router-dom'
import React, { useContext } from 'react';
import server from '../../../shared/server';
import "./CourseDetailsTab.css";
import PortalDatePicker from "../../portalDatePicker/PortalDatePicker";

function CourseDetailsTab(props)
{
    
    const [course,setCourse]=useState(null);
    const [projects,setProjects]=useState([]);
    const [currentProj,setCurrentProj]=useState("");
    const [currentDate,setCurrentDate]=useState (null);
    const [city,setCity]=useState("");
    let  {id}  = useParams( );
    const activeUser = useContext(ActiveUserContext);
    console.log ("props",props.courseDetails);
    function stub(e)
    {
      //Do nothing
    }
    function setCityCallback(e)
    {
        setCity(e.target.value);
    }
   function getCities()
   {
    const data={cityid:id};
    server(activeUser, data, "GetCities").then(res => {
            console.log(res);
            if (res.data.error) 
            {
                console.log("error ",res.data.error);
            } 
            else {
                console.log("Success ",res.data);
                setCity(res.data);
            }
        }, err => {
            console.error(err);
        })
    }
   
    function setDateCallback(e)
    {
         setCurrentDate({ "day": e.day, "month": e.month, "year": e.year }); 
    }

    function getCourseDetails()
    {
        const data={courseid:id};
        server(activeUser, data, "GetCourseById").then(res => {
            console.log(res);
            if (res.data.error) 
            {
               console.log("error ",res.data.error);
            } 
            else {
                console.log("Success ",res.data);
                setCourse(res.data);
            }
        }, err => {
            console.error(err);
        })
    }
    function getProjects()
    {
        const data={projectid:id};
        server(activeUser, data, "GetProjects").then(res => {
            console.log(res);
            if (res.error) 
            {
               console.log("error ",res.error);
            } 
            else {
                console.log("Success ",res);
                setProjects(res.data);
             
            }
        }, err => {
            console.error(err);
        })
    }
    function changeCurrentProj(e)
    {
        setCurrentProj(e.target.value);
    }
    useEffect(() => {
        getCourseDetails();
        getCities();
        getProjects();

      },[]);
      const courseFullName=  <PortalInput title="שם קורס מלא"
       placeholder={course?course.name:""} value={course?course.name:""} handleChange={stub}/>

       const courseSubName=  <PortalInput title="שם קורס מקוצר"
       placeholder={course?course.subname:""} value={course?course.subname:""} handleChange={stub}/>

       const courseSubNameArab=  <PortalInput title=" שם קורס מקוצר בערבית"
       placeholder={course?course.subnameinarabic:""} value={course?course.subnameinarabic:""} handleChange={stub}/>

       const portalProjectsSelect =<PortalSelect handleSelection={changeCurrentProj} optionsKey={currentProj} options={projects.map( project=> project.projectname)}/>
       const portalCitiesSelect =<PortalSelect optionsKey={city}  handleSelection={setCityCallback} options={city}/>
       const portalDate= <PortalDatePicker  date={currentDate} 
       handleDateSelection={setDateCallback} />
       return (
    
    <div className="course-details-tab-main">
        {course ? courseFullName:""}
        {course ? courseSubName:""}
        {course ? courseSubNameArab:""}
        {projects?portalProjectsSelect:""}
        <div>תאריך לידה</div>
        {portalDate}
        <div>עיר</div>
        {/*city?portalCitiesSelect:""*/}
    </div>);
}
export default CourseDetailsTab;