import React from 'react'
import { CartItems } from '../components/CartItems'
import { Footer } from '../components/Footer'

export const CartPage = () => {
    return (
        <div className='cart-page'>
            <CartItems />
            <Footer />
        </div>
    )
}
