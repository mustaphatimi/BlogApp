import React from 'react'
import './category.css'
import { category } from '../../data/data'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { RiArrowLeftCircleFill } from 'react-icons/ri'
import { RiArrowRightCircleFill } from 'react-icons/ri'

const SmapleNextArrow = (props) => {
    const { onClick } = props
    return (
        <div className="control-btn">

            <button className='next' onClick={onClick}>
                <RiArrowRightCircleFill className='icon' />
            </button>
        </div>
    )
}
const SmaplePrevArrow = (props) => {
    const { onClick } = props

    return (
        <div className="control-btn">
            <button className='prev' onClick={onClick}>
                <RiArrowLeftCircleFill className='icon' />
            </button>
        </div>

    )
}

export default function Category() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        nextArrow: <SmapleNextArrow />,
        prevArrow: <SmaplePrevArrow />,
        responsive: [{
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        }]
    };
    return (
        <>
            <section className="category">
                <div className="container">
                    <Slider {...settings}>

                        {category.map((el) => (
                            <div className="boxs" key={el.id}>
                                <div className="box">
                                    <img src={el.cover} alt="" />
                                    <div className="overlay">
                                        <h4>{el.category}</h4>
                                        <p>{el.title}</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </Slider>

                </div>
            </section>
        </>
    )
}
