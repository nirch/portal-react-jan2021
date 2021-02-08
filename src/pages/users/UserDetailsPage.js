import React, { useContext, useEffect, useState } from 'react';
import './users.css';
import './UserDetailsPage.css';
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext';
import SaveImage from "../../assets/images/noun_save_2429243.png";
import CopyImage from "../../assets/images/noun_copy_573715.png";
import BackArrow from "../../assets/images/noun_back_arrow_2690272.png";
import ProfileIcon from "../../assets/images/profile_icon.png";
import { Redirect, useHistory, useParams } from 'react-router-dom'
import server from '../../shared/server';
import PortalTabView from '../../components/portalTabView/PortalTabView';
import UserProfileTab from '../../components/UserDetails/UserProfileTab';
import UserCoursesTab from '../../components/UserDetails/UserCoursesTab';
import UserEmployeesTab from '../../components/UserDetails/UserEmployeesTab';
import UserReportsTab from '../../components/UserDetails/UserReportsTab';
import Enums from '../../shared/enums';

const UserDetailsPage = (props) => {
    const { handleLogout } = props;
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const activeUser = useContext(ActiveUserContext);
    const history = useHistory();

    const imgsDomain = Enums.imgsDomain;

    useEffect(() => {
        async function fetchUserDetails() {
            const userDetails = await server(activeUser, {
                userId: id
            }, "GetUserProfileById");
            setUserDetails(userDetails.data.profile);
        }
        fetchUserDetails();
    }, [activeUser, id])

    if (!activeUser) {
        return <Redirect to='/' />
    }

    const tabs = userDetails && [{ "header": "פרופיל", "view": <UserProfileTab userProfile={userDetails}/> }, { "header": "קורסים", "view": <UserCoursesTab /> }, { "header": "עובדים", "view": <UserEmployeesTab /> }, { "header": "דיווח", "view": <UserReportsTab /> }]

    const getRegisterDate = (inputDate) => {
        const res = inputDate.split(" ");
        return res[1] + " " + res[0];
    }

    function redirectToUsersPage(){
        history.goBack();
    }

    return (
        <div className="p-user-details">
            <PortalNavbar handleLogout={handleLogout} haedline="עובדים" back={redirectToUsersPage} />
            { userDetails ?
                <div className="root">
                    <div className="right-root">
                        <h2>{userDetails.firstname}<br />{userDetails.lastname}</h2>
                        <div className="change-pass">
                            <input type="checkbox" id="changePass" name="changePass" value="" />
                            <label htmlFor="changePass">שינוי סיסמה</label>
                        </div>
                        <h5>נרשם ב: {getRegisterDate(userDetails.registerdate)}</h5>
                    </div>
                    <div className="left-root">
                        <div className="left-root-icons">
                            <img src={BackArrow} alt="Back" />
                            <img src={CopyImage} alt="Copy" />
                            <img src={SaveImage} alt="Save" />
                        </div>
                        <img src={userDetails.image ? imgsDomain + userDetails.image : ProfileIcon} alt="ProfileImage" />
                    </div>
                </div>
                : ""}
            <div className="tabs-container">
                {tabs && <PortalTabView tabs={tabs}></PortalTabView>}
            </div>
        </div>
    );
}

export default UserDetailsPage;