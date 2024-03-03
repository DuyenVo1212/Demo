import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {checkIsLogin} from '../features/cart/cartSlice'
import { useFormik } from 'formik'

export const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [error, setError] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: values => {
            const errors = {}

            if(!values.email){
                errors.email = 'Required'
            } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
                errors.email = 'Invalid email address'
            }
            if(!values.password){
                errors.password = 'Required'
            } else if(values.password.length < 8){
                errors.password = 'Must be 8 characters or more'
            }
            return errors
        },
        onSubmit: async (values) => {
            try {
                const rawResponse = await fetch('https://candleafs-api-1311.herokuapp.com/api/auth/login', 
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email: values.email, password: values.password})
                });
                const content = await rawResponse.json();
                localStorage.setItem("token", content.token)
                localStorage.setItem("userName", content.user.name)
                setError(false)
                dispatch(checkIsLogin())
                navigate('/')
            } catch (error) {
                setError(true)
            }
        }
    })

    return (
        <div className='sign-in'>
            <form className='signin-form' onSubmit={formik.handleSubmit}>
                <div className="form-item">
                    <label htmlFor="email" style={{opacity: "0.7"}}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur = {formik.handleBlur}
                    ></input>
                    {formik.errors.email && formik.touched.email ? <p className='error-message'>{formik.errors.email}</p>: null}

                </div>

                <div className="form-item">
                    <label htmlFor="passwordSignUp" style={{opacity: "0.7"}}>Password</label>
                    <input
                        type="password"
                        id="passwordSignUp"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur = {formik.handleBlur}
                    ></input>
                    {formik.errors.password && formik.touched.password ? <p className='error-message'>{formik.errors.password}</p>: null}
                </div>

                <div>
                    {error ? <p style={{color: "red", fontSize: "14px", marginBottom: "15px"}}>Email or password wrong</p> : null}
                </div>

                <div className="login">
                    <button type="submit" className="signup-btn">Sign in</button>
                </div>
            </form>
        </div>
    )
}
