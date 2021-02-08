import { useContext, useEffect, useState } from 'react';
import ActiveUserContext from '../../shared/activeUserContext';
import server from '../../shared/server';
import PortalInput from '../PortalInput/PortalInput';
import PortalMultipleSelect from '../PortalMultipleSelect/PortalMultipleSelect';
import PortalSelect from '../PortalSelect/PortalSelect'
import './UserProfileTab.css'

function UserProfileTab({userProfile}){
    const activeUser = useContext(ActiveUserContext);
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
    const [citys, setCitys] = useState('');
    const [] = useState('');

    useEffect(() => {
        async function getCitys(){
            const res = await server(activeUser, {}, 'GetCities')
            console.log(res);
            if (res.status === 200) {
                setCitys(res.data)
            }
        }

        getCitys();
    },[]);
    
    return(
        <div className='c-user-profile-tab'>
            <div className='row'>
                <div className='column'>
                    <PortalInput title='שם פרטי בעברית' value={firstname} placeholder='שם פרטי בעברית' handleChange={e => setFirstname(e.target.value)}/>
                </div>
                <div className='column'>
                    <PortalInput title='שם משפחה בעברית' value={lastname} placeholder='שם משפחה בעברית' handleChange={e => setLastname(e.target.value)}/>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    <PortalInput title='שם פרטי בערבית' value={firstnameinarabic} placeholder='שם פרטי בערבית' handleChange={e => setFirstnameinarabic(e.target.value)}/>
                </div>
                <div className='column'>
                    <PortalInput title='שם משפחה בערבית' value={lastnameinarabic} placeholder='שם משפחה בערבית' handleChange={e => setLastnameinarabic(e.target.value)}/>
                </div>
            </div>
            <div className='row'>
            <PortalInput title="מס' טלפון" value={phone} handleChange={e => setPhone(e.target.value)}/>
            </div>
            <div className='row'>
                <div className='column'>
                    <PortalInput title="מס' טלפון נוסף" value={phone2} handleChange={e => setPhone2(e.target.value)}/>
                </div>
                <div className='column'>
                    <PortalInput title='שייך ל' value={phone2owner} handleChange={e => setPhone2owner(e.target.value)}/>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    <PortalInput title='תאריך לידה' value={birthday} handleChange={e => setBirthday(e.target.value)}/>
                </div>
                <div className='column'>
                    <PortalInput title='מספר תעודת זהות' value={tznumber} handleChange={e => setTznumber(e.target.value)}/>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    <PortalSelect title='עיר' options={citys ? citys.map(city => city.name) : []} optionsKey={cityid}/>
                </div>
                <div className='column'>
                    <PortalInput title='כתובת' value={address} handleChange={e => setAddress(e.target.value)}/>
                </div>
            </div>
            <div className='row'>
                <PortalInput title='אימייל' value={email} handleChange={e => setEmail(e.target.value)}/>
            </div>
            <div className='row'>
                <PortalMultipleSelect title='מאשרי שעות נוספים' options={[{key:'1', value:'שמעון'},{key:'2', value:'אברהם'},{key:'3', value:'יוסף'}]} 
                    selectedOptions={approverIds ? approverIds : []} handleSelection={(arr => {setApproverIds(arr.map(app => app.key))})}/>
            </div>
        </div>
    )
}

export default UserProfileTab;