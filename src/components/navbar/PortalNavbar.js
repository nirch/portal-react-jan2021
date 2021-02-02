import React, { useState } from 'react';
import { Navbar, Nav, Row } from 'react-bootstrap'
import logo from '../../assets/images/logo.png';
import profileIcon from '../../assets/images/profile_icon.png';
import './navbar.css'

const PortalNavbar = (props) => {
    const { handleLogout } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
   
    let sidebar= "";
    if (sidebarOpen){
        sidebar= "sidebar-open";
    }


    return (
<div className="c-navbar">
	<div className={sidebar}>
		<div className="hamburger" onClick={() => setSidebarOpen(true)}></div>
		<div className="hamburger" onClick={() => setSidebarOpen(true)}></div>
		<div className="hamburger" onClick={() => setSidebarOpen(true)}></div>
		<div className="sidebar-background" onClick={() => setSidebarOpen(false)}></div>
		<div className="sidebar-wrap">
			<div className="sidebar">
				<div className="sidebar-header">
					<Row className="sidebar-header-x">
						<span onClick={() => setSidebarOpen(false)}>&#215;</span>
					</Row>
					<Row className="sidebar-header-logo">
						<img className="appleseeds-logo" src={logo}></img>
					</Row>
				</div>
				<div className="profile-preview">
					<img className="profile-image" ng-click="profileClick()" src={profileIcon}></img>
					<div className="name-wrap">
						<span className="user-name">
							שם
						</span>
					</div>
				</div>
				<div className="sidebar-options">
					<div className="menu-information" ng-click="goToCoursesPage()">
						קורסים
					</div>
					<div className="menu-information"  ng-click="goToSettingPage()">
					 	הגדרות	
					</div>
					<div className="menu-information" ng-click="logout()">
						התנתקות
					</div>
				</div>
			</div>
		</div>
	</div>
</div>





        // <div className="c-navbar">
        //     <Navbar bg="light" expand="lg">
        //         <Navbar.Brand href="/">פורטל תפוח</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="mr-auto">
        //                 <Nav.Link href="#/courses">קורסים</Nav.Link>
        //                 <Nav.Link href="#/users">משתמשים</Nav.Link>
        //                 <Nav.Link href="#/hours-report">דיווח שעות</Nav.Link>
        //                 <Nav.Link href="#/hours-approve">אישור שעות</Nav.Link>
        //                 <Nav.Link onClick={handleLogout}>התנתקות</Nav.Link>
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Navbar>
        // </div>
    );
}

export default PortalNavbar;