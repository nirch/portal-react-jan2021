import React, { useContext, useState } from 'react';
import './courses.css'
import "./CourseDetailsPage.css";
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import server from '../../shared/server';
import  { useEffect } from 'react';
import { useParams } from "react-router-dom";
import backArrowImage from "../../assets/images/noun_back_arrow_2690272.svg";
import copyImage from "../../assets/images/noun_copy_573715.svg";
import saveImage from "../../assets/images/noun_save_2429243.svg";
import PortalTabView from "../../components/portalTabView/PortalTabView"
import CourseDetailsTab from '../../components/CourseDetails/CourseDetailsTab/CourseDetailsTab';
import CourseSyllabusTab from '../../components/CourseDetails/CourseSyllabusTab/CourseSyllabusTab';
import StudentsTab from '../../components/CourseDetails/CourseStudentsTab/CourseStudentsTab';
import TeachersTab from '../../components/CourseDetails/CourseTeachersTab/CourseTeachersTab';
const CourseDetailsPage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    const [course,setCourse]=useState(null);
    let  {id}  = useParams( );

   

   
    useEffect(() => {
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
      },[]);

      if (!activeUser) {
        return <Redirect to='/' />
    }

   

   
    const tabs =
     [{ "header": "קורס", "view": <CourseDetailsTab courseDetails={course} /> }, 
    { "header": "סילבוס", "view": <CourseSyllabusTab courseDetails={course} /> }, 
    { "header": "סטודנטים", "view": <StudentsTab courseDetails={course}/> }, 
    { "header": "מדריכים", "view": <TeachersTab courseDetails={course}/> }];

   
   

    const subName= <div className="course-details-subname">{course?course.subname:""} </div>
    const fullName= <div className="course-details-full-name">{course?course.name:""} </div>
  
   

    return (
        <div className="p-course-details">
            <div className="p-course-header">
            <PortalNavbar handleLogout={handleLogout} haedline="קורסים"/>
            <div className="p-course-wrapper">
             {course? subName:""}
             <div className="p-course-images">
                <img src={backArrowImage}/>
                <img src={copyImage}/>
                <img src={saveImage}/>
                
             </div>

             </div>
             {course? fullName:""}
             </div>
             <PortalTabView tabs={tabs}></PortalTabView>

        </div>
    );
}

export default CourseDetailsPage;