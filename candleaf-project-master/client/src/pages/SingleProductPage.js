import React from 'react'
import { SingleProduct } from '../components/SingleProduct'
import {Footer} from '../components/Footer'

export const SingleProductPage = () => {

    return (
        <div className='single-product-page'>
            <SingleProduct />
            <Footer />
        </div>
    )
}
