import React from 'react'
import { AuthenticationTitles } from './AuthenticationTitles';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {useFormik} from 'formik';

export const Authentication = () => {
    const {cartItems, total} = useSelector(store => store.cart);
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            phone: '',
            name: '',
            secondName: '',
            address: '',
            shippingNote: '',
            city: '',
            postalCode: '',
            province: '',
            country: ''
        },
        validate: values => {
            const errors = {}
            if(!values.phone){
                errors.phone = 'Required'
            }
            if(!values.name){
                errors.name = 'Required'
            }
            if(!values.secondName){
                errors.secondName = 'Required'
            }
            if(!values.address){
                errors.address = 'Required'
            }
            if(!values.shippingNote){
                errors.shippingNote = 'Required'
            }
            if(!values.city){
                errors.city = 'Required'
            }
            if(!values.postalCode){
                errors.postalCode = 'Required'
            }
            if(!values.province){
                errors.province = 'Required'
            }
            if(!values.country){
                errors.country = 'Required'
            }
            return errors
        },
        onSubmit: values => {
            navigate('/shipping')
        }
    })
    return (
        <div className='authentication'>
            <div className='authentication-container'>
                <form className='authentication-text' onSubmit={formik.handleSubmit}>
                    <AuthenticationTitles />
                    <div className='authentication-text__contact'>
                        <div className='authentication-title'>
                            <h2>Contact</h2>
                            <p>Do you have an account?  <span>Login</span></p>
                        </div>
                        <div className='authentication-text-form'>
                            <input 
                                type="text" 
                                id='phone' 
                                name="phone" 
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur = {formik.handleBlur} 
                                placeholder='Mobile phone number' 
                                className='text-input' />
                            {formik.errors.phone && formik.touched.phone ? <p className='error-authentication'>{formik.errors.phone}</p>: null}
                            <input type="checkbox" name="10% discount" className='checkbox-input' />
                            <label htmlFor="10% discount">Add me to Candleaf newsletter for a 10% discount</label>
                        </div>
                    </div>
                    <div className='authentication-text__shipping-address'>
                        <h2>Shipping Address</h2>
                        <div>
                            <div className='name'>
                                <div style={{marginBottom: "12px"}}>
                                    <input 
                                        type="text" 
                                        id='name' 
                                        name='name' 
                                        placeholder='Name' 
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur = {formik.handleBlur}
                                        className='name-input'/>
                                    {formik.errors.name && formik.touched.name ? <p className='error-authentication'>{formik.errors.name}</p>: null}
                                </div >
                                    <div style={{marginBottom: "12px"}}>
                                        <input 
                                            type="text" 
                                            id='secondName'
                                            name='secondName'
                                            value={formik.values.secondName}
                                            onChange={formik.handleChange}
                                            onBlur = {formik.handleBlur}
                                            placeholder='Second Name' 
                                            className='second-name-input'/>
                                        {formik.errors.secondName && formik.touched.secondName ? <p className='error-authentication'>{formik.errors.secondName}</p>: null}
                                    </div>
                            </div>
                            <div style={{marginBottom: "12px"}}>
                                <input
                                    type="text" 
                                    id='address'
                                    name='address'
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur = {formik.handleBlur}
                                    placeholder='Address and number' 
                                    className='address-num-input'/>
                                    
                                {formik.errors.address && formik.touched.address ? <p className='error-authentication'>{formik.errors.address}</p>: null}
                            </div>
                            <div style={{marginBottom: "12px"}}>
                                <input
                                    type="text" 
                                    id='shippingNote'
                                    name='shippingNote'
                                    value={formik.values.shippingNote}
                                    onChange={formik.handleChange}
                                    onBlur = {formik.handleBlur}
                                    placeholder='Shipping note (optional)' 
                                    className='shipping-note-input'/>
                                {formik.errors.shippingNote && formik.touched.shippingNote ? <p className='error-authentication'>{formik.errors.shippingNote}</p>: null}
                            </div>
                            
                            <div className='address'>
                                <div style={{marginBottom: "12px"}}>
                                    <input 
                                        type="text" 
                                        id='city'
                                        name='city'
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        onBlur = {formik.handleBlur}
                                        placeholder='City' 
                                        className='city-input'/>
                                    {formik.errors.city && formik.touched.city ? <p className='error-authentication'>{formik.errors.city}</p>: null}
                                </div>
                                <div style={{marginBottom: "12px"}}>
                                    <input 
                                        type="text" 
                                        id='postalCode'
                                        name='postalCode'
                                        value={formik.values.postalCode}
                                        onChange={formik.handleChange}
                                        onBlur = {formik.handleBlur}
                                        placeholder='Postal Code' 
                                        className='code-input'/>
                                    {formik.errors.postalCode && formik.touched.postalCode ? <p className='error-authentication'>{formik.errors.postalCode}</p>: null}
                                </div>
                                <div style={{marginBottom: "12px"}}>
                                    <input 
                                        type="text" 
                                        id='province'
                                        name='province'
                                        value={formik.values.province}
                                        onChange={formik.handleChange}
                                        onBlur = {formik.handleBlur}
                                        placeholder='Province' 
                                        className='province-input'/>
                                    {formik.errors.province && formik.touched.province ? <p className='error-authentication'>{formik.errors.province}</p>: null}
                                </div>                                
                            </div>
                            <div style={{marginBottom: "12px"}}>
                                <input 
                                    type="text" 
                                    id='country'
                                    name='country'
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    onBlur = {formik.handleBlur}
                                    placeholder='Country Region' 
                                    className='country-input'/>
                                {formik.errors.country && formik.touched.country ? <p className='error-authentication'>{formik.errors.country}</p>: null}
                            </div>
                            
                            <input type="checkbox" className='save-checkbox' name="save"/>
                            <label htmlFor="save">Save this informations for a future fast checkout</label>
                        </div>
                    </div>
                    <div className='authentication-text__shipping-btn'>
                        <Link to="/cart" className='back-to-cart-link'>Back to cart</Link>
                        <button type="submit" className='shipping-link'>Go to shopping</button>
                        <Link to="/cart" className='back-to-cart-link-r'>Back to cart</Link>
                    </div>
                </form>
                <div className='authentication-product'>
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
                    <div className='authentication-details'>
                        <div className="authentication-details__code">
                            <input type="text" placeholder='Coupon code' className='code-input'/>
                            <button>Add code</button>
                        </div>
                        <div className='authentication-details__subtotal-shipping'>
                            <div className='subtotal'>
                                <p>Subtotal</p>
                                <p>$ 9.99</p>
                            </div>
                            <div className='shipping'>
                                <p>Shipping</p>
                                <p>Calculated at the next step</p>
                            </div>
                        </div>
                        <div className='authentication-details__total'>
                            <p className='title'>Total</p>
                            <p className='total-price'>$ {total}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
