import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import bgImg from '../images/bg-image.jpg';

export const Hero = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplaySpeed: 500,
        autoplay: true,
        pauseOnHover: false,
        // responsive: [
        //     {
        //     breakpoint: 1024,
        //     settings: {
        //         slidesToShow: 3,
        //         slidesToScroll: 3,
        //         infinite: true,
        //         dots: true
        //     }
        // },
        // {
        //     breakpoint: 600,
        //     settings: {
        //         slidesToShow: 2,
        //         slidesToScroll: 2,
        //         initialSlide: 2
        //     }
        // },
        // {
        //     breakpoint: 480,
        //     settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1
        //     }
        // }
        // ]
    };
    
    return (
        <div className='hero'>
            <div className='hero-container'>
                    <div><img src={bgImg} alt='candleaf' className="hero-img"/></div>               
                <div className='hero-modal'>
                    <h1 className='hero-modal__title'>The nature candle</h1>
                    <p className='hero-modal__subtitle'>All handmade with natural soy wax, Candleaf is a companion for all your pleasure moments </p>
                    <Link to="/products" className='hero-modal__discovery-btn'>Discovery our collection</Link>
                </div>
            </div>
        </div>
    )
}
