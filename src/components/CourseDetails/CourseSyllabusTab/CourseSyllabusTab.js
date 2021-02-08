import { Accordion, Card ,Button} from "react-bootstrap";
import "./CourseSyllabusTab.css"

function CourseSyllabusTab(props)
{
    
    const {courseDetails} = props;
    
    let syllabus="";
    let syllabusSub="";
    let syllabusToPresent="";
    if (courseDetails){

        console.log(courseDetails);
        console.log(courseDetails.subjects[0].subject);
        syllabus= courseDetails.subjects;
        console.log(syllabus);

        syllabusToPresent= syllabus.map(function (syllabusSubject,index) {
                            const subSubjects = syllabusSubject.subsubjects;
                            // console.log(subSubjects[0].subject);        
                            const subSubjectsToPrint = subSubjects.map ((subSubject,index)=> <p key={index}>{subSubject.subject} </p>)
                            console.log(subSubjectsToPrint);
                            return (
                                    <>
                                       <Accordion defaultActiveKey="0">
                                            <Card>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                        {syllabusSubject.subject}
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>{subSubjectsToPrint}</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                          
                                            </Accordion>
                                    </>
                                        
                                    
                                    )
                            }  )

                            

    }


    return (
        <div className="c-syllabus">
            {syllabusToPresent}
        </div>
    );
}
export default CourseSyllabusTab;