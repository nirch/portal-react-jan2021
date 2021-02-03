import React, { useState } from 'react';
import { Navbar, Nav, Row, Col } from 'react-bootstrap'
import logo from '../../assets/images/logo.png';
import profileIcon from '../../assets/images/profile_icon.png';
import usersTab from '../../assets/images/usersTab.png';
import courseTab from '../../assets/images/courseTab.png';
import hoursReport from '../../assets/images/hoursReport.png';
import hoursAprove from '../../assets/images/hoursAprove.png';
import logout from '../../assets/images/logout.png';

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
		<div className="hamburger" onClick={() => setSidebarOpen(true)}>
			<div ></div>
			<div></div>
			<div></div>
		</div>
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
				<Row className="profile-preview">
					<Col className="profile-image">
					<img  ng-click="profileClick()" src={profileIcon}></img>
					</Col>
					<Col className="name-wrap">
							<span className="user-name">
								שם
							</span>
					</Col>
				</Row>
			
				<div className="sidebar-options">
				<div className="menu-information"  ng-click="goToSettingPage()">
					<Row className="courses-tab">
                            <Col className="courses-tab-image">
                                <img  ng-click="profileClick()" src={courseTab}></img>
                            </Col>
                            <Col className="courses-tab-courses">
                                <a href="#/courses">
                                    קורסים
                                </a>                            
                            </Col>
                        </Row>	
					</div>
					<div className="menu-information" ng-click="goToCoursesPage()">
						<Row className="users-tab">
                            <Col className="users-tab-image">
                                <img  ng-click="profileClick()" src={usersTab}></img>
                            </Col>
                            <Col className="users-tab-users">
                                <a href="#/users">
                                    משתמשים
                                </a>                            
                            </Col>
                        </Row>
					</div>
				
					<div className="menu-information" ng-click="logout()">
					<Row className="hoursReport-tab">
                            <Col className="hoursReport-tab-image">
                                <img  ng-click="profileClick()" src={hoursReport}></img>
                            </Col>
                            <Col className="hoursReport-tab-hoursReport">
                                <a href="#/hours-report">
                                    דיווח שעות
                                </a>                            
                            </Col>
                        </Row>
					</div>
					<div className="menu-information" ng-click="logout()">
					<Row className="hoursAprove-tab">
                            <Col className="hoursAprove-tab-image">
                                <img  ng-click="profileClick()" src={hoursAprove}></img>
                            </Col>
                            <Col className="hoursAprove-tab-hoursAprove">
                                <a href="#/hours-approve">
                                    אישור שעות
                                </a>                            
                            </Col>
                        </Row>
					</div>
					<div className="menu-information" ng-click="logout()">
					<Row className="logout-tab">
                            <Col className="logout-tab-image">
                                <img  ng-click="profileClick()" src={logout}></img>
                            </Col>
                            <Col className="logout-tab-logout">
                                <a onClick={handleLogout}>
                                    התנתקות
                                </a>                            
                            </Col>
                        </Row>
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