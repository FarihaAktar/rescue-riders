import React, { useContext, useState } from 'react';
import './CreateAccount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import Header from '../../Header/Header';
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework } from '../LoginManager';
import { UserContext } from '../../../App';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';


const CreateAccount = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        success: false,
    })
    initializeLoginFramework();
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
        }
        if (e.target.name === "confirmPassword") {
            const { password } = user;
            if (password !== e.target.value) {
                isFormValid = false
            }
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }
    const handleSubmit = (e) => {
        if (user.email && user.password && user.confirmPassword) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    console.log(res)
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
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
                console.log(loggedInUser)
            })
    }
    return (
        <div className='container'>
            <Header></Header>
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
                        {user.success && <p>Account Created successfully</p>}
                        <p style={{ color: 'red' }}>{user.error}</p>
                        <h6>Already have an account?</h6>
                        <Link to="/login">Login</Link>
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

export default CreateAccount;