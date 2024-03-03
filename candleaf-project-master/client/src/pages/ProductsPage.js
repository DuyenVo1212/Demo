import React from 'react'
import { Footer } from '../components/Footer'
import { Products } from '../components/Products'

export const ProductsPage = () => {
    return (
        <div className='products-page'>
            <Products />
            <Footer />
        </div>
    )
}
