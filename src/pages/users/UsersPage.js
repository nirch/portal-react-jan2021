import React, { useContext, useState, useEffect } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect, useLocation } from 'react-router-dom'
import PortalSearchPager from '../../components/PortalSearchPager/PortalSearchPager';
import PortalTable from '../../components/PortalTable/PortalTable';
import PortalButtonSet from '../../components/portalButtonSet/PortalButtonSet';
import server from '../../shared/server';



const UsersPage = (props) => {

    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    const [users, setUsers] = useState([]);
    
    const location = useLocation();
    const options ={students:"SearchStudentsUnderMe", employee : "SearchStaffUnderMe", new : "SearchNewUsers"};
    const placeholderOptions ={students:"חיפוש חניכים", employee : "חופוש עובדים", new : " חיפוש עובדים חדשים"};
    const buttonOptions ={students:"חניכים", employee : " עובדים", new : "  עובדים חדשים"};
    const buttons = [
        { key: 1, label: buttonOptions[location.search.split('=')[1]] +" פעילים"},
        { key: 0, label: "לא פעילים" }];
    const [selectedButton, setSelectedButton] = useState(buttons[0]);
    const [searchText, setSearchText] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [pages, setPages] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [loading, setLoading] = useState(true);
  
   // console.log(options[location.search.split('=')[1]]);

    useEffect(() => {
         async function fetchUsers() {
            setLoading(true);
            const serverUsers = await server(activeUser, {
                desc: false,
                page: pageNumber,
                search: searchText,
                sorting: "userid",
                userstatus: selectedButton.key
            }, options[location.search.split('=')[1]]);
              
                 setUsers(serverUsers.data.users);
                 setPages(serverUsers.data.pages);
                 setLoading(false);
        } 
        fetchUsers();
    }, [pageNumber, searchText,selectedButton, location])
     
    useEffect(() => {
        setPageNumber(0);
    
    }, [location]);

    const headers = [{ key: "firstname", header: "שם" }, { key: "lastname", header: "שם משפחה" }, { key: "email", header: "אימייל" }];
    //callback functions for search component
    const handleSearch = (searchText) => {
        setSearchText(searchText);
        setPageNumber(0);
    }
    const pageChange = (num) => {
        setPageNumber(num-1);
    }
    //callback function for table compoment

    
    const handleSelectedRow = newSelectedRow =>   setSelectedRow(newSelectedRow);
    const handleClick = newSelectedButton => {
        if (selectedButton.key !== newSelectedButton.key)
        {
            setSelectedButton(newSelectedButton); 
            setPageNumber(0);
        }
    };
 

    if (!activeUser) {
        return <Redirect to='/' />
    }


    if (selectedRow)
    {
        return <Redirect to= {`/users/${selectedRow.userid}`}/>
    }

    return (
        <div className="p-users">
            <PortalNavbar handleLogout={handleLogout} />
            <div className="p-user_search">
            {loading ?
            <div className="text-center content">
                <div className="spinner-grow text-warning  spinner" role="status">
                  
                </div>
            </div>
             : 
                <PortalSearchPager
                    placeholder={placeholderOptions[location.search.split('=')[1]]}
                    pagesNumber={pages}
                    currentPage={pageNumber+1}
                    handleSearch={handleSearch}
                    pageChange={pageChange} />}

            </div>

            <PortalTable headers={headers} data={users} changeSelected={handleSelectedRow}/>
            <div className="p-users-buttons">
                <PortalButtonSet buttons={buttons} handleClick={handleClick} selectedButton={selectedButton} hasTopBorder={true} />
            </div>
        </div>
    );
}

export default UsersPage;