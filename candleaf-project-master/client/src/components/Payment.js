import React from 'react'
import { AuthenticationTitles } from './AuthenticationTitles'
import creditCardImg from '../images/credit-card.png';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'

export const Payment = () => {
    const {cartItems, total} = useSelector(store => store.cart);
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues:{
            cardNumber: '',
            holderName: '',
            expiration: '',
            cvv: ''
        },
        validate: values => {
            const errors = {}
            if(!values.cardNumber){
                errors.cardNumber = 'Required'
            }
            if(!values.holderName){
                errors.holderName = 'Required'
            }
            if(!values.expiration){
                errors.expiration = 'Required'
            }
            if(!values.cvv){
                errors.cvv = 'Required'
            }
            return errors
        },
        onSubmit: values => {
            navigate('/')
        }
    })
    return (
        <div className='payment'>
            <div className='payment-container'>
                <form className='payment-text' onSubmit={formik.handleSubmit}>
                    <AuthenticationTitles />
                    <div className='payment-text__method'>
                        <p className='name-method'>Payment method</p>
                        <div className='credit-card'>
                            <div className='credit-card-title'>
                                <img srcSet={`${creditCardImg} 4x`} alt='credit-card' />
                                <p>Credit Card</p>
                            </div>
                            <div className='form-payment'>
                                <div style={{marginBottom: "12px"}}>
                                    <input 
                                        type="text" 
                                        id='cardNumber'
                                        name='cardNumber'
                                        value={formik.values.cardNumber}
                                        onChange={formik.handleChange}
                                        onBlur = {formik.handleBlur}
                                        placeholder="Card Number" 
                                        className='card-number-input'/>
                                    {formik.errors.cardNumber && formik.touched.cardNumber ? <p className='error-payment'>{formik.errors.cardNumber}</p>: null}
                                </div>
                                <div style={{marginBottom: "12px"}}>
                                    <input 
                                        type="text" 
                                        id='holderName'
                                        name='holderName'
                                        value={formik.values.holderName}
                                        onChange={formik.handleChange}
                                        onBlur = {formik.handleBlur}
                                        placeholder="Holder Name" 
                                        className='card-name-input'/>
                                    {formik.errors.holderName && formik.touched.holderName ? <p className='error-payment'>{formik.errors.holderName}</p>: null}
                                </div>
                                
                                <div className='date-input-container'>
                                    <div style={{marginBottom: "12px"}}>
                                        <input 
                                            type="text" 
                                            id='expiration'
                                            name='expiration'
                                            value={formik.values.expiration}
                                            onChange={formik.handleChange}
                                            onBlur = {formik.handleBlur}
                                            placeholder="Expiration (MM/YY)" 
                                            className='date-input'/>
                                        {formik.errors.expiration && formik.touched.expiration ? <p className='error-payment'>{formik.errors.expiration}</p>: null}
                                    </div>
                                    <div style={{marginBottom: "12px"}}>
                                        <input 
                                            type="text" 
                                            id='cvv'
                                            name='cvv'
                                            value={formik.values.cvv}
                                            onChange={formik.handleChange}
                                            onBlur = {formik.handleBlur}
                                            placeholder="CVV" 
                                            className='cvv-input'/>
                                        {formik.errors.cvv && formik.touched.cvv ? <p className='error-payment'>{formik.errors.cvv}</p>: null}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='payment-text__shipping-btn'>
                        <Link to="/shipping" className='back-to-details-link'>Back to shipping</Link>
                        <button type='submit' className='payment-link'>Pay now</button>
                        <Link to="/shipping" className='back-to-details-link-r'>Back to shipping</Link>
                    </div>
                </form>
                <div className='payment-products'>
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
                    <div className='payment-details'>
                        <div className="payment-details__code">
                            <input type="text" placeholder='Coupon code' className='code-input'/>
                            <button>Add code</button>
                        </div>
                        <div className='payment-details__subtotal-shipping'>
                            <div className='subtotal'>
                                <p>Subtotal</p>
                                <p>$ 9.99</p>
                            </div>
                            <div className='shipping'>
                                <p>Shipping</p>
                                <p>Calculated at the next step</p>
                            </div>
                        </div>
                        <div className='payment-details__total'>
                            <p className='title'>Total</p>
                            <p className='total-price'>$ {total}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
