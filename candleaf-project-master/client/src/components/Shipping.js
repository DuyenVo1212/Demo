import React from 'react'
import { AuthenticationTitles } from './AuthenticationTitles'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Shipping = () => {
    const {cartItems, total} = useSelector(store => store.cart);

    return (
        <div className='shipping'>
            <div className='shipping-container'>
                <div className='shipping-text'>
                    <AuthenticationTitles />
                    <div className='shipping-text__address'>
                        <div className='shipping-contact'>
                            <div>
                                <span className='contact-title'>Contact</span><span className='contact-info'>hophap1311@gmail.com</span>
                            </div>
                            <p className='edit'>Edit</p>
                        </div>
                        <div className='shipping-ship-to'>
                            <div>
                                <span className='ship-to-title'>Ship to</span><span className='ship-to-info'>Trung Hoa, Cukuin, DakLak</span>
                            </div>
                            <p className='edit'>Edit</p>
                        </div>
                    </div>
                    <div className='shipping-text__method'>
                        <p className='method-title'>Shipping method</p>
                        <div className='type-method-container'>
                            <div className='type-method'>
                                <input type='radio' name='shipping-mothod'/>
                                <label htmlFor='shipping-method'>Standard Shipping</label>
                            </div>
                            <p>Free</p>
                        </div>
                    </div>
                    <div className='shipping-text__shipping-btn'>
                        <Link to="/authentication" className='back-to-details-link'>Back to details</Link>
                        <Link to="/payment" className='payment-link'><button>Go to payment</button></Link>
                        <Link to="/authentication" className='back-to-details-link-r'>Back to details</Link>
                    </div>
                </div>
                <div className='shipping-products'>
                    {cartItems.map(item => {
                        const {_id, img, amount, name, price} = item;
                        return <div className='product-info' key={_id}>
                                    <div className='product-info__img-amount'>
                                        <img srcSet={`${img} 4x`} alt="img"/>
                                        <p>{amount}</p>
                                    </div>
                                    <div className='product-info__name-price'>
                                        <h2>{name}</h2>
                                        <p>$ {price*amount}</p>
                                    </div>
                                </div>
                    })}
                    <div className='shipping-details'>
                        <div className="shipping-details__code">
                            <input type="text" placeholder='Coupon code' className='code-input'/>
                            <button>Add code</button>
                        </div>
                        <div className='shipping-details__subtotal-shipping'>
                            <div className='subtotal'>
                                <p>Subtotal</p>
                                <p>$ 9.99</p>
                            </div>
                            <div className='shipping'>
                                <p>Shipping</p>
                                <p>Calculated at the next step</p>
                            </div>
                        </div>
                        <div className='shipping-details__total'>
                            <p className='title'>Total</p>
                            <p className='total-price'>$ {total}</p>
                        </div>
                    </div>
                </div>
            </div>     
        </div>
    )
}
