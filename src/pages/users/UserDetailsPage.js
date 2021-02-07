import React, { useContext, useState } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'

const UserDetailsPage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    const [redirectToUsers, setRedirectToUsersPage]= useState(false);
    if (!activeUser) {
        return <Redirect to='/' />
    }

    if (redirectToUsers) {
        return <Redirect to='/users' />
    }

    function redirectToUsersPage(){
        setRedirectToUsersPage(true);
    
    }
    return (
        <div className="p-user-details">
            <PortalNavbar handleLogout={handleLogout} haedline="עובדים" back={redirectToUsersPage}/>
            <h1>פרטי משתמש</h1>
        </div>
    );
}

export default UserDetailsPage;