import React from 'react'
import './register.css';
import back from '../../assets/images/my-account.jpg'
import { Link } from 'react-router-dom';


export default function Register() {
    return (
        <section className="login">
            <div className="containers">
                <div className="backImg">
                    <img src={back} alt="" />
                    <div className="text">
                        <h3>Register</h3>
                        <h1>My Account</h1>
                    </div>
                </div>
                <form action="">
                    <span>Username</span>
                    <input type="text" name="" id="" required />
                    <span>Email address</span>
                    <input type="text" name="" id="" required />
                    <span>Password</span>
                    <input type="password" name="" id="" required />
                    <button className="button">Sign Up</button>
                    <Link to='/login'>Login</Link>
                </form>
            </div>
        </section>
    )
}
