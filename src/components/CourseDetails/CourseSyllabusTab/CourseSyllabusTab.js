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
                            // console.log(subSubjects);        
                            const subSubjectsLevel2 = subSubjects.map (function(subSubject,index){
                                                        const subSubjects = subSubject.subsubjects; 
                                                        // console.log(subSubjects) ;     
                                                        
                                                        const subSubjectsLevel3 = subSubjects.map ((subSubjectL3,index)=> <p  key={index}>{subSubjectL3.subject}</p>)


                                                        return(

                                                            <Accordion defaultActiveKey="0">
                                                            <Card>
                                                                <Card.Header>
                                                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                                    {subSubject.subject}
                                                                    </Accordion.Toggle>
                                                                </Card.Header>
                                                                <Accordion.Collapse eventKey="0">
                                                                    <Card.Body>{subSubjectsLevel3}</Card.Body>
                                                                </Accordion.Collapse>
                                                            </Card>
                                                            </Accordion> 
                                                        )
                                                     } )

                            console.log(subSubjectsLevel2);
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
                                                    <Card.Body>{subSubjectsLevel2}</Card.Body>
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