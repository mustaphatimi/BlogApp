import React from 'react'
import './blog.css'
import { blog } from '../../data/data'
import { AiOutlineTag } from 'react-icons/ai';
import { AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai';
import { Link } from 'react-router-dom'

export default function Card() {
    return (
        <section className='blog'>
            <div className="container grid3">
                {blog.map((el) => (
                    <div className="box boxItems" key={el.id}>
                        <div className="img">
                            <img src={el.cover} alt="" />
                        </div>
                        <div className="details">
                            <div className="tag">
                                <AiOutlineTag className='icon' />
                                <a href='/'>{el.category}</a>
                            </div>
                            <Link to={`details/${el.id}`} className='link'>
                                <h3>{el.title}</h3>
                            </Link>
                            <p>{el.desc.slice(0, 180)}...</p>
                            <div className="date">
                                <AiOutlineClockCircle className='icon' /><label htmlFor="">{el.date}</label>
                                <AiOutlineComment className='icon' /><label htmlFor="">27</label>
                                <AiOutlineShareAlt className='icon' /><label htmlFor="">SHARE</label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
