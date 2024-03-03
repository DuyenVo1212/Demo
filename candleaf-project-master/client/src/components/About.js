import React from 'react'
import icon from '../images/checkmark.svg';
import aboutImg from '../images/about-img.png'
import { Link } from 'react-router-dom'

export const About = () => {
    
    return (
        <div className='about'>
            <div className='about-container'>
                <div className='about-text'>
                    <div className="about-info">
                        <h2 className='about-info__title'>Clean and fragrant soy wax</h2>
                        <p className='about-info__subtitle'>Made for your home and for your wellness</p>
                        <img srcSet = {`${aboutImg} 4x`} alt='about-img-r' className='about-img-r'/>
                        <div className='about-info__icon-container'>
                            <img src={icon} alt="" className='check-icon-img'/><span><span className='ingredient-name'>Eco-sustainable:</span> All recyclable materials, 0% CO2 emissions</span>
                        </div>
                        <div className='about-info__icon-container'>
                            <img src={icon} alt="" className='check-icon-img'/><span><span className='ingredient-name'>Hyphoallergenic:</span> 100% natural, human friendly ingredients</span>
                        </div>
                        <div className='about-info__icon-container'>
                            <img src={icon} alt="" className='check-icon-img'/><span><span className='ingredient-name'>Handmade:</span> All candles are craftly made with love.</span>
                        </div>
                        <div className='about-info__icon-container'>
                            <img src={icon} alt="" className='check-icon-img'/><span><span className='ingredient-name'>Long burning:</span> No more waste. Created for last long.</span>
                        </div>
                    </div>                 
                    <Link to="/about" className='about-btn'>Learn more</Link>
                </div>

                <div className='about-img'>
                    <img srcSet={`${aboutImg} 4x`} alt="about-img" />
                </div>
            </div>   
        </div>
    )
}
