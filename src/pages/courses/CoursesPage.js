import './courses.css'
import React, { useContext, useEffect, useState } from 'react';
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import server from '../../shared/server';
import PortalTable from '../../components/PortalTable/PortalTable';
import PortalButtonSet from '../../components/portalButtonSet/PortalButtonSet';
import PortalSearchPager from '../../components/PortalSearchPager/PortalSearchPager';


const CoursesPage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);  
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pagesNumber, setPagesNumber] = useState(0);
    const [searchStr, setSearchStr] = useState("");   

    const headers = [{key: "subname", header: "שם קורס מקוצר"}, 
                     {key: "project", header: "פרויקט"},
                     {key: "teachers", header: "מדריך"}]

    const buttons = [{key: 1, label: "קורסים פעילים"},
                     {key: 0, label: "לא פעילים"}]

    const [selectedButton, setSelectedButton] = useState(buttons[0]);

    const handleSelectedRow = newSelectedRow =>   setSelectedRow(newSelectedRow);
    const handleClick = newSelectedButton => {
        if (selectedButton.key !== newSelectedButton.key)
        {
            setSelectedButton(newSelectedButton); 
            setCurrentPage(0);
        }
    };
    const handlePageChange = newCurrentPage => setCurrentPage(newCurrentPage-1);
    const handleSearch = newString => {setSearchStr(newString); setCurrentPage(0)};

    useEffect( () => {
		const sorting = "courseid";
		const desc = false;
        const data = {'search': searchStr, 'sorting': sorting, 'desc':desc, 'coursestatus': selectedButton.key, 'page': currentPage};

		server(activeUser, data, 'SearchCourses').then(function (data) {
            setCourses(data.data.courses.slice(0));
            setPagesNumber(data.data.pages+1);
            setLoading(false);
		});
    },[selectedButton, currentPage, searchStr]);

        
    if (!activeUser) {
        return <Redirect to='/' />
    }

    if (selectedRow)
    {
        return <Redirect to= {`/courses/${selectedRow.courseid}`}/>
    }

    return (
        <div className="p-courses">
            <PortalNavbar handleLogout={handleLogout} haedline="קורסים"/>
            <div className="search">
                <PortalSearchPager placeholder="חיפוש קורס"  pagesNumber={pagesNumber} currentPage={currentPage+1} handleSearch={handleSearch} pageChange={handlePageChange} />
            </div>
            {loading ?
            <div className="text-center content">
                <div className="spinner-grow text-warning  spinner" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
             : 
            <div className="content" >
                <PortalTable headers={headers} data={courses} changeSelected={handleSelectedRow}/>
            </div>
             } 
            <div  className="footer">
                <PortalButtonSet buttons={buttons} handleClick={handleClick} selectedButton={selectedButton} hasTopBorder={true}/>
            </div>
        </div>
    );
}

export default CoursesPage;