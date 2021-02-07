import React, { useState } from 'react';
import { Navbar, Nav, Row, Col } from 'react-bootstrap'
import logo from '../../assets/images/logo.png';
import profileIcon from '../../assets/images/profile_icon.png';
import usersTab from '../../assets/images/usersTab.png';
import courseTab from '../../assets/images/courseTab.png';
import hoursReport from '../../assets/images/hoursReport.png';
import hoursAprove from '../../assets/images/hoursAprove.png';
import logout from '../../assets/images/logout.png';
import arrow_down from '../../assets/images/arrow_down.png';
import arrow_up from '../../assets/images/arrow_up.png';

import './navbar.css'

const PortalNavbar = (props) => {
    const { handleLogout, haedline, back } = props;
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [usersTabOpen, setUsersTabOpen] = useState(false);
	
   
    let sidebar= "";
    if (sidebarOpen){
        sidebar= "sidebar-open";
    }

	function toggleUsersTab(){
		const currentState= usersTabOpen;
		setUsersTabOpen(!currentState);
	}

	let usersTabToggle= "usersTab-closed";
    if (usersTabOpen){
        usersTabToggle= "usersTab-open";
	}

    return (
<div className="c-navbar">
	<div className={sidebar}>
		<Row className="haedlineRow">
			<Col className="hamburger" onClick={() => setSidebarOpen(true)}>
				<div ></div>
				<div></div>
				<div></div>
			</Col>
			<Col className="haedline">
				<p>{haedline}</p>
			</Col>
		
		</Row>
	
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
					<img   src={profileIcon}></img>
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
                                <img src={courseTab}></img>
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
                                <img src={usersTab}></img>
                            </Col>
                            <Col className="users-tab-users">
									<Row onClick={toggleUsersTab}>
										<a>
											משתמשים
										</a>
										
										{usersTabOpen? <img src={arrow_up} ></img> : <img src={arrow_down} onClick={toggleUsersTab}></img>}
									</Row>
									<div className={usersTabToggle}>
										<Row>
											<a href="#/users?type=employee" onClick={()=> setSidebarOpen(false) }>
												עובדים
											</a>
										</Row>
										<Row>
											<a href="#/users?type=students" onClick={()=> setSidebarOpen(false) }>
												חניכים
											</a>
										</Row>
										<Row>
											<a href="#/users?type=new" onClick={()=> setSidebarOpen(false) }>
												משתמשים חדשים
											</a>
										</Row>
									</div>
                            </Col>
                        </Row>
					</div>
				
					<div className="menu-information">
						<Row className="hoursReport-tab">
								<Col className="hoursReport-tab-image">
									<img  src={hoursReport}></img>
								</Col>
								<Col className="hoursReport-tab-hoursReport">
									<a href="#/hours-report">
										דיווח שעות
									</a>                            
								</Col>
							</Row>
					</div>
					<div className="menu-information">
						<Row className="hoursAprove-tab">
								<Col className="hoursAprove-tab-image">
									<img src={hoursAprove}></img>
								</Col>
								<Col className="hoursAprove-tab-hoursAprove">
									<a href="#/hours-approve">
										אישור שעות
									</a>                            
								</Col>
							</Row>
					</div>
					<div className="menu-information">
						<Row className="logout-tab">
                            <Col className="logout-tab-image">
                                <img src={logout}></img>
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