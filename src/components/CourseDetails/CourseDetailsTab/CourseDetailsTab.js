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
import { Col, Container, Row } from "react-bootstrap";
import PortalMultipleSelect from "../../PortalMultipleSelect/PortalMultipleSelect";

function CourseDetailsTab(props)
{
    
    const [course,setCourse]=useState(props.courseDetails);
    const [projects,setProjects]=useState([]);
    const [currentProj,setCurrentProj]=useState("");
   // const [currentDate,setCurrentDate]=useState (null);
    const [cities,setCities]=useState([]);
    const [city,setCity]=useState("");
    const [budgets,setBugdets]=useState([]);
    const [bugdet,setBugdet]=useState("");
    const [projectTages,setProjectTages]=useState([]);
    const [projectCurrentTages,setProjectCurrentTages]=useState([]);
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
                setCities(res.data);
            }
        }, err => {
            console.error(err);
        })
    }
   
   /* function setDateCallback(e)
    {
         setCurrentDate({ "day": e.day, "month": e.month, "year": e.year }); 
    }*/

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
    
       for (let i=0;i<projects.length;++i)
       {
           if (projects[i].projectname===e.target.value)
           {
               console.log ("project tages",projects[i].projecttags);
               setProjectTages(projects[i].projecttags);
           }
       } 
       setCurrentProj(e.target.value);
       console.log ("project tagesssssss",projectTages);
    }
    function changeCurrentBudget(e)
    {
        setBugdet(e.target.value);
    }
    function getBudgets()
    {
        const data={yearbudgetid:id};
        server(activeUser, data, "GetActiveYearsBudget").then(res => {
            console.log(res);
            if (res.error) 
            {
               console.log("error ",res.error);
            } 
            else {
                console.log("Success ",res);
                setBugdets(res.data);
             
            }
        }, err => {
            console.error(err);
        })
    }
    function tagsOperation(selectedOptionsObjects,options,isAdded)
    {
      
            setProjectCurrentTages(selectedOptionsObjects.map (tag=> tag.key ));
      
    }
    useEffect(() => {
        getCourseDetails();
        getCities();
        getProjects();
        getBudgets();
      },[]);
      const courseFullName=  <PortalInput title="שם קורס מלא"
       placeholder={course?course.name:""} value={course?course.name:""} handleChange={stub}/>

       const courseSubName=  <PortalInput title="שם קורס מקוצר"
       placeholder={course?course.subname:""} value={course?course.subname:""} handleChange={stub}/>

       const courseSubNameArab=  <PortalInput title=" שם קורס מקוצר בערבית"
       placeholder={course?course.subnameinarabic:""} value={course?course.subnameinarabic:""} handleChange={stub}/>

       const portalProjectsSelect =<PortalSelect title="פרויקט" handleSelection={changeCurrentProj} optionsKey={currentProj} options={projects.map( project=> project.projectname)}/>
       const portalCitiesSelect =<PortalSelect title="עיר" optionsKey={city}  handleSelection={setCityCallback} options={cities.map( c=> c.name)}/>
      
       const portalBudget= <PortalSelect  title="תקציב" handleSelection={changeCurrentBudget} optionsKey={bugdet} options={budgets.map( c=> c.year)}/>
       const portalTages =<PortalMultipleSelect title="תגיות" 
       options={projectTages.map (tag =>  { return {"key":tag.projecttagid,"value":tag.projecttagname}})} 
       selectedOptions={projectCurrentTages.map (tag => tag.projecttagid )} handleSelection={tagsOperation} />
       return (
    
    <div className="course-details-tab-main">
        <Container>
        <Row>
            <Col>
                {course ? courseFullName:""}
            </Col>
        </Row>
        <Row>
            <Col >
                {course ? courseSubName:""}
            </Col>
            <Col >
                {course ? courseSubNameArab:""}
            </Col>
        </Row>
        <Row>
            <Col  >
            {projects?portalProjectsSelect:""}
            </Col>
        </Row>
        <Row >  
           
            <Col >
                {cities?portalCitiesSelect:""}
           </Col>
           
           <Col >
                {budgets?portalBudget:""} 
            </Col>
        </Row>
      {/*<Row>
            <Col>
            {projectTages?portalTages:""}
            </Col>
      </Row>  */}
       </Container>
    </div>);
}
export default CourseDetailsTab;