import React from 'react'
import { nav } from '../../data/data.js'
import { Link } from 'react-router-dom'
import './header.css'
import logo from '../../assets/images/logo.svg'
import User from './User.jsx'

export default function Header() {
    window.addEventListener('scroll', function () {
        const header = this.document.querySelector('.header')
        header.classList.toggle('active', this.window.scrollY > 100)
    })
    return (
        <>
            <header className='header'>
                <div className="scontainer flex">
                    <div className="logo">
                        <img src={logo} alt="logo" width='100px' />
                    </div>
                    <nav>
                        <ul>
                            {nav.map(el => (
                                <li>
                                    <Link key={el.id} to={el.url}>{el.text}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="account flexCenter">
                        <User />
                    </div>
                </div>
            </header>
        </>
    )
}
