import { useEffect, useState } from 'react';
import server from '../../shared/server';
import PortalInput from '../PortalInput/PortalInput';
import PortalMultipleSelect from '../PortalMultipleSelect/PortalMultipleSelect';
import PortalSelect from '../PortalSelect/PortalSelect'
import './UserProfileTab.css'

function UserProfileTab({userProfile}){
    const [firstname, setFirstname] = useState(userProfile.firstname)
    const [lastname, setLastname] = useState(userProfile.lastname)
    const [firstnameinarabic, setFirstnameinarabic] = useState(userProfile.firstnameinarabic);
    const [lastnameinarabic, setLastnameinarabic] = useState(userProfile.lastnameinarabic);
    const [phone, setPhone] = useState(userProfile.phone);
    const [phone2, setPhone2] = useState(userProfile.phone2);
    const [phone2owner, setPhone2owner] = useState(userProfile.phone2owner);
    const [birthday, setBirthday] = useState(userProfile.birthday);
    const [tznumber, setTznumber] = useState(userProfile.tznumber);
    const [cityid, setCityid] = useState(userProfile.cityid);
    const [address, setAddress] = useState(userProfile.address);
    const [religionid, setReligionid] = useState(userProfile.religionid);
    const [genderid, setGenderid] = useState(userProfile.genderid);
    const [email, setEmail] = useState(userProfile.email);
    const [managerid, setManagerid] = useState(userProfile.managerid);
    const [approverIds, setApproverIds] = useState(userProfile.approverIds);
    const [languages, setLanguages] = useState(userProfile.languages);
    const [projects, setProjects] = useState(userProfile.projects);
    const [] = useState('');
    const [] = useState('');

    useEffect(() => {
        async function getUserProfile() {
            // const res = await server(,{userId},'GetUserProfileById')
        }
        getUserProfile();
    },[]);

    return(
        <div className='c-user-profile-tab'>
            <div className='row'>
                <div className='column'>
                    <PortalInput title='שם פרטי בעברית' value={firstname} placeholder='שם פרטי בעברית'/>
                </div>
                <div className='column'>
                    <PortalInput title='שם משפחה בעברית' value={lastname} placeholder='שם משפחה בעברית'/>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    <PortalInput title='שם פרטי בערבית' value={firstnameinarabic} placeholder='שם פרטי בערבית'/>
                </div>
                <div className='column'>
                    <PortalInput title='שם משפחה בערבית' value={lastnameinarabic} placeholder='שם משפחה בערבית'/>
                </div>
            </div>
            <div className='row'>
            <PortalInput title="מס' טלפון" value={phone}/>
            </div>
            <div className='row'>
                <div className='column'>
                    <PortalInput title="מס' טלפון נוסף" value={phone2}/>
                </div>
                <div className='column'>
                    <PortalInput title='שייך ל' value={phone2owner}/>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    <PortalInput title='תאריך לידה' value={birthday}/>
                </div>
                <div className='column'>
                    <PortalInput title='מספר תעודת זהות' value={tznumber}/>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    {/* <PortalSelect title='עיר' options={[{key:'902', value:'תל אביב'}]} optionsKey={cityid}/> */}
                </div>
                <div className='column'>
                    <PortalInput title='כתובת' value={address}/>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    {/* <PortalSelect title='מגזר' options={[{key:'902', value:'תל אביב'}]} optionsKey={religionid}/> */}
                </div>
                <div className='column'>
                    {/* <PortalSelect title='מגדר' options={[{key:'902', value:'תל אביב'}]} optionsKey={genderid}/> */}
                </div>
            </div>
            <div className='row'>
                <PortalInput title='אימייל' value={email}/>
            </div>
            <div className='row'>
                <PortalInput title='מנהל ישיר' value={managerid}/>
            </div>
            <div className='row'>
                {/* <PortalMultipleSelect title='מאשרי שעות נוספים' options={[{key:'1', value:'שמעון'},{key:'2', value:'אברהם'},{key:'3', value:'יוסף'}]} 
                    selectedOptions={approverIds}/> */}
            </div>
            <div className='row'>
                {/* <PortalMultipleSelect title='תעודות' options={[{key:'1', value:'שמעון'},{key:'2', value:'אברהם'},{key:'3', value:'יוסף'}]} 
                    selectedOptions={approverIds}/> */}
            </div>
            <div className='row'>
                {/* <PortalMultipleSelect title='תעודות בגרות' options={[{key:'1', value:'שמעון'},{key:'2', value:'אברהם'},{key:'3', value:'יוסף'}]} 
                    selectedOptions={approverIds}/> */}
            </div>
            <div className='row'>
                {/* <PortalMultipleSelect title='שפות' options={[{key:'1', value:'שמעון'},{key:'2', value:'אברהם'},{key:'3', value:'יוסף'}]} 
                    selectedOptions={languages}/> */}
                
            </div>
            <div className='row'>
                {/* <PortalMultipleSelect title='פרויקטים' options={[{key:'1', value:'שמעון'},{key:'2', value:'אברהם'},{key:'3', value:'יוסף'}]} 
                    selectedOptions={projects}/> */}
            </div>
        </div>
    )
}

export default UserProfileTab;