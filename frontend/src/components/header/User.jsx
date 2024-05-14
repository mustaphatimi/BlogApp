import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiImageAddLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { GrHelp } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";

export default function User() {
    let user = true;

    const [profileOpen, setProfileOpen] = useState(false)

    const close = () => {
        setProfileOpen(false)
    }

    return (
        <>
            <div className="profile">
                {user ? (
                    <>
                        <button className='img' onClick={() => { setProfileOpen(!profileOpen) }}>
                            <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=600" alt="images" />
                        </button>

                        {profileOpen && <div className="openProfile boxItems" onClick={close}>
                            <Link to="/account">
                                <div className="image">
                                    <div className="img">
                                        <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=600" alt="images" />
                                    </div>
                                    <div className="text">
                                        <h4>Eden Smith</h4>
                                        <p>Los Angeles, CA</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="create">
                                <button className="box">
                                    <RiImageAddLine className='icon' />
                                    <h4>Create Post</h4>
                                </button>
                            </Link>
                            <button className="box">
                                <IoSettingsOutline className='icon' />
                                <h4>My Account</h4>
                            </button>
                            <button className="box">
                                <BsBagCheck className='icon' />
                                <h4>My Order</h4>
                            </button>
                            <button className="box">
                                <AiOutlineHeart className='icon' />
                                <h4>Wishlist</h4>
                            </button>
                            <button className="box">
                                <GrHelp className='icon' />
                                <h4>Help</h4>
                            </button>
                            <button className="box">
                                <BiLogOut className='icon' />
                                <h4>Logout</h4>
                            </button>
                        </div>}
                    </>) : (
                    <Link to='/login'>
                        <button>My Account</button></Link>
                )}
            </div>
        </>
    )
}