import React, { useContext, useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import Header from '../Header/Header';
import { UserContext } from '../../App';
import { handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';



const Login = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    })

    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
            // console.log(isFormValid)
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }

    const handleSignIn = (e) => {
        if (user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // console.log(res)
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                    // console.log(user)

                })
        }
        else{
            alert("Enter at least 6 Character and a number!")
        }
        e.preventDefault();
    }
    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res =>{
            setUser(res);
            setLoggedInUser(res);
            history.replace(from);
        })
    }
    return (
        <div className="container">
            <Header></Header>
            <div className="form">
                <h4>Login</h4>
                <form onSubmit={handleSignIn}>
                    <input onBlur={handleBlur} className="input-text" type="email" name="email" required placeholder="Email" />
                    <br />
                    <input onBlur={handleBlur} className="input-text" type="password" name="password" required placeholder="Password" />
                    <br />
                    <br />
                    <input type="checkbox" name="user" id="" />
                    <label htmlFor="user"> Remember Me</label>
                    <a className="forgot-tag" href="/account">Forgot Password</a>
                    <input className="form-button" type="submit" value="Login" />
                    <div className="comment">
                         <p style={{ color: 'red' }}>{user.error}</p>
                        <h6>Don't have an account?</h6>
                        <Link to="/account">Create an account</Link>
                    </div>
                </form>
            </div>
            <div className="social-media">
                <h5>Or</h5>
                <div onClick={googleSignIn} className="social-icon-text">
                    <FontAwesomeIcon className="social-icon" icon={faGoogle} />
                    <h6 >Continue with Google</h6>
                </div>
            </div>
        </div>
    );
};

export default Login;