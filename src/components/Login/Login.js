import React, { useContext, useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import Header from '../Header/Header';
import { UserContext } from '../../App';
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';
import { useHistory, useLocation } from 'react-router';




const Login = () => {
    const [changed, setChanged] = useState(true);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    })


    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
            if(!isFormValid){
                alert("Put at Least six characters and a number!");
            }
        }
        if (e.target.name === "confirmPassword") {
            const { password } = user;
            if (password !== undefined && password !== e.target.value) {
                isFormValid = false;
                alert("Password didn't match!");
            }
            
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSignIn = (e) => {
        if (user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    if (res.error) {
                        setUser(res);
                        setLoggedInUser(res);
                        // console.log(user)
                    }
                    else {
                        setUser(res);
                        setLoggedInUser(res);
                        history.replace(from);
                    }

                })
        }
        e.preventDefault();
    }

    const handleSubmit = (e) => {
        if (user.email && user.password && user.confirmPassword) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    if (res.error) {
                        setUser(res);
                        setLoggedInUser(res);
                        console.log(user)
                    }
                    else {
                        setUser(res);
                        setLoggedInUser(res);
                        history.replace(from);
                    }
                })
        }
        e.preventDefault()
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }

    const handleChange = () => {
        setChanged(!changed);

    }
    return (
        <div className="container">
            <Header></Header>
            {changed ? <div className="form">
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
                        {/* <Link to="/account">Create an account</Link> */}
                        <p onClick={handleChange}>Create an account</p>

                    </div>
                </form>
            </div>
                :
                <div className="form">
                    <h4>Create an account</h4>
                    <form onSubmit={handleSubmit}>
                        <input onBlur={handleBlur} className="input-text" type="text" name="name" required placeholder="Name" />
                        <br />
                        <input onBlur={handleBlur} className="input-text" type="email" name="email" required placeholder="Username&Email" />
                        <br />
                        <input onBlur={handleBlur} className="input-text" type="password" name="password" required placeholder="Password" />
                        <br />
                        <input onBlur={handleBlur} className="input-text" type="Password" name="confirmPassword" required placeholder="Confirm Password" />
                        <br />
                        <input className="form-button" type="submit" value="Create an account" />
                        <div className="comment">
                            {user?.success && <p>Account Created successfully</p>}
                            <p style={{ color: 'red' }}>{user.error}</p>
                            <h6>Already have an account?</h6>
                            <p onClick={handleChange}>Login</p>
                        </div>
                    </form>
                </div>

            }
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