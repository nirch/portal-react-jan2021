import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import './login.css'
import server from '../../shared/server'
import { Redirect } from 'react-router-dom'
import ActiveUserContext from '../../shared/activeUserContext'
import AppleImage from "../../assets/Login/Pictures/01.svg";
import ErrorImage from "../../assets/Login/Pictures/err.svg";
const LoginPage = (props) => {
    const { handleLogin } = props;
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const activeUser = useContext(ActiveUserContext);
    const [errorMessage,setErrorMessage]=useState("");
    const login = () => {

        if(!email || !pwd)
		{
           // alert("נא להזין פרטי משתמש");
            setErrorMessage("נא להזין פרטי משתמש");
			return;
        }
        
        const data = {email, pass: pwd};
        server(null, data, "login").then(res => {
            console.log(res);
            if (res.data.error) 
            {
                setErrorMessage ("שם משתמש או סיסמא שגויים!");
               // alert("error in login");
            } 
            else {
                
                handleLogin(res.data);
            }
        }, err => {
            console.error(err);
        })
    }
    function closeError(e) //close the error place
    {
        setErrorMessage("");
    }

    if (activeUser) {
        return <Redirect to='/courses' />
    }
    const ErrorImageDiv=  <img src={ErrorImage}  alt="error"/>;
    const errorLoginDiv = <Container className="login-err">

    {errorMessage ? ErrorImageDiv:""} {/* if there is no error don't display the image*/}
    <div className="login_error_message"> {errorMessage}</div> 

    <Button className="login-error-close-button" type="button" onClick={closeError} >&#10006;</Button>
    </Container>;

    return (
        <div className="login-overall-wrapper">
        <Container className="p-login">
            <img src={AppleImage} alt="Logo" className="login-logo" />
            <Form>
                <div className="login-Fields-wrapper">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label></Form.Label>
                    <Form.Control  className="f-login email-login" value={email} type="email" placeholder="אימייל" onChange={e => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label></Form.Label>
                    <Form.Control   className="f-login password-login" value={pwd} type="password" placeholder="סיסמה" onChange={e => setPwd(e.target.value)}/>
                </Form.Group>
                </div>

                <div className="Login-button-wrapper">
                    <Button variant="primary" type="button" className="button-login" onClick={login}>
                        התחברות
                    </Button> 
                </div>
            </Form>
          {errorMessage?errorLoginDiv:""}
        </Container>
       
       </div>
    );
}

export default LoginPage;