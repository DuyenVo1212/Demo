import React, {useState} from 'react'
import {useFormik} from 'formik';
import { useNavigate } from 'react-router-dom'
import {checkIsLogin} from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'

export const SignUp = () => {
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: values => {
            const errors = {}
            if(!values.name){
                errors.name = 'Required'
            } else  if(values.name.length > 8){
                errors.name = 'Must be 8 characters or less'
            }
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
            if(!values.confirmPassword){
                errors.confirmPassword = 'Required'
            } else if(values.confirmPassword !== values.password){
                errors.confirmPassword = 'Password did not match'
            }
            return errors
        },
        onSubmit: async (values) => {
            try {
                const rawResponse = await fetch('https://candleafs-api-1311.herokuapp.com/api/auth/register', 
                {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name: values.name, email: values.email, password: values.password})
                });
                const content = await rawResponse.json();
                localStorage.setItem("token", content.token)
                localStorage.setItem("userName", content.user.name)
                setError(false)
                dispatch(checkIsLogin())
                navigate("/")
            } catch (error) {
                setError(true)
            }
        }
    })

    return (
        <div className='sign-up'>
            <form onSubmit={formik.handleSubmit} className='signup-form'>
                <div className="form-item">
                    <label htmlFor="name" style={{opacity: "0.8"}}>First and last name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur = {formik.handleBlur}
                    ></input>
                    {formik.errors.name && formik.touched.name ? <p className='error-message'>{formik.errors.name}</p>: null}
                </div>

                <div className="form-item">
                    <label htmlFor="email" style={{opacity: "0.8"}}>Email</label>
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

                <div className="form-item" style={{opacity: "0.8"}}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur = {formik.handleBlur}
                    ></input>
                    {formik.errors.password && formik.touched.password ? <p className='error-message'>{formik.errors.password}</p>: null}
                </div>

                <div className="form-item">
                    <label htmlFor="confirmPassword" style={{opacity: "0.8"}}>Confirm password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                    ></input>
                    {formik.errors.confirmPassword && formik.touched.confirmPassword ? <p className='error-message'>{formik.errors.confirmPassword}</p>: null}
                </div>

                <div>
                    {error ? <p style={{color: "red", marginBottom: '20px', fontSize: '14px'}}>Email was used by other users</p> : null}
                </div>

                <div className="login">
                    <button
                        type="submit"
                        className="signup-btn"
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    )
}
