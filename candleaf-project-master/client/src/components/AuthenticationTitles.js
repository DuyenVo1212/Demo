import React from 'react'
import { NavLink } from 'react-router-dom'

export const AuthenticationTitles = () => {
    return (
        <div className='authentication-titles'>
            <NavLink to="/cart" className='title cart-title'>Cart</NavLink>
            <i className='fas fa-angle-right'></i><NavLink to="/authentication" className='title details-title'>Details</NavLink>
            <i className='fas fa-angle-right'></i><NavLink to="/shipping" className='title shipping-title'>Shipping</NavLink>
            <i className='fas fa-angle-right'></i><NavLink to="/payment" className='title payment-title'>Payment</NavLink>
        </div>
    )
}
