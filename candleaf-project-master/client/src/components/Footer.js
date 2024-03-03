import React from 'react'
import footerImg from '../images/footer-icon.svg'
import footerText from '../images/footer-text.png'

export const Footer = () => {

    return (
        <div className='footer'>
            <div className='footer-container'>
                <div className='footer-underline'></div>
                <div className='footer-info'>
                    <div className='footer-header'>
                        <div className='footer-header__logo'>
                            <img src={footerImg} alt="footer-logo" className='footer-header__img' />
                            <img srcSet={`${footerText} 4x`} className='footer-header__title' alt='title'></img>
                        </div>
                        <p className='footer-header__subtitle'>Your natural candle made for your home and for your wellness.</p>
                    </div>
                    <div className='footer-informations'>
                        <div className='discovery'>
                            <h4 className='discovery__title'>Discovery</h4>
                            <div className='discovery__informations'>
                                <p>New season</p>
                                <p>Most searched</p>
                                <p>Most selled</p>
                            </div>
                        </div>
                        <div className='about'>
                            <h4 className='about__title'>About</h4>
                            <div className='about__informations'>
                                <p>Help</p>
                                <p>Shipping</p>
                                <p>Affiliate</p>
                            </div>
                        </div>
                        <div className='info'>
                            <h4 className='info__title'>Info</h4>
                            <div className='info__informations'>
                                <p>Contact us</p>
                                <p>Privacy Policies</p>
                                <p>Terms &amp; Conditions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
