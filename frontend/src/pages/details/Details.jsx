import React, { useEffect, useState } from 'react'
import './details.css'
import { blog } from '../../data/data';
import { useParams } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';

const Details = () => {
    const { id } = useParams();

    const [blogs, setBlogs] = useState(null)

    useEffect(() => {
        let blogs = blog.find((blog) => blog.id === parseInt(id))

        if (blogs) {
            return setBlogs(blogs)
        } setBlogs(null)
    })

    return (
        <section className="singlePost">
            {blogs ? (
                <div className="container">
                    <div className="left">
                        <img src={blogs.cover} alt="" />
                    </div>
                    <div className="right">
                        <div className="buttons">
                            <button className="button">
                                <BsPencilSquare className='icon' />
                            </button>
                            <button className="button">
                                <AiOutlineDelete className='icon' />
                            </button>
                        </div>
                        <h1>{blogs.title}</h1>
                        <p>{blogs.desc}</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem rerum a illo, qui, quia, facilis cumque dolorem error porro deleniti laudantium vel. Quas in odio ex facilis nisi asperiores expedita?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem rerum a illo, qui, quia, facilis cumque dolorem error porro deleniti laudantium vel. Quas in odio ex facilis nisi asperiores expedita?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem rerum a illo, qui, quia, facilis cumque dolorem error porro deleniti laudantium vel. Quas in odio ex facilis nisi asperiores expedita?</p>
                    </div>
                </div>
            ) : (<p>No blogs found</p>)}

        </section>
    )
}

export default Details;