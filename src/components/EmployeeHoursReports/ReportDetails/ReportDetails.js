import './ReportDetails.css';

import React from 'react';
import calculateHours from '../../../shared/calculateHours';

const ReportDetails = (props) => {
    const {status, checked, report, reportingPerimeter} = props;

    let bgColor;
    if (status === '-1'){
        bgColor='#ffa1a1';
    } else if (status === '0') {
        bgColor='#f5cc0c';
    } else if (status === '1') {
        bgColor='#a1d47f';
    }

    const style = {
        backgroundColor:bgColor
    }

    const hours = calculateHours(report.starthour, report.finishhour).timeFormat;

    const project = reportingPerimeter[report.projectid];
    const course = project.courses.find(course => course.courseid === report.courseid);
    const subject = project.subjects.find(subject => subject.reportsubjectid === report.actionid);;

    return (
        <div className='c-report-details' style={style}>
            <div className='headline'>
                <div className='checkbox'>
                    <div className='checkbox-Square'>
                        <div className={checked ? 'checkbox-fill' : ''}>
                            <div className='checkmark'>
                                <div className='checkmark-long'></div>
                                <div className='checkmark-short'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='date'>
                    <div className='title'>תאריך: </div>
                    <div className='data'>{report.date}</div>
                </div>
                <div className='hours'>
                    <div className='title'>סה"כ שעות: </div>
                    <div className='data'>{hours}</div>
                </div>
                <div className='actions'>
                    <div className='actions-dots'>...</div>
                </div>
            </div>
            <div className='content'>
                <div className='project'>
                    <div className='title'>פרויקט</div>
                    <div className='data'>{project.projectName}</div>
                </div>
                <div className='course-name'>
                    <div className='title'>מס/שם הקורס</div>
                    <div className='data'>{course ? course.courseName : 'כללי'}</div>
                </div>
                <div className='activity'>
                    <div className='title'>נושא פעילות</div>
                    <div className='data'>{subject.subject}</div>
                </div>
            </div>
        </div>
    );
}

export default ReportDetails;