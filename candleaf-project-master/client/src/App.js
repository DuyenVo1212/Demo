import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import {Navbar} from './components/Navbar';
import { AboutPage } from './pages/AboutPage';
import { SingleProductPage } from './pages/SingleProductPage';
import { CartPage } from './pages/CartPage';
import { ProductsPage } from './pages/ProductsPage';
import ScrollToTop from './components/ScrollToTop';
import './styles/main.css';
import { useEffect } from 'react';
import { getTotalAmount, getAllCandleafs } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AuthenticationPage } from './pages/AuthenticationPage';
import { ShippingPage } from './pages/ShippingPage';
import { PaymentPage } from './pages/PaymentPage';
import {SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';

function App() {
    const dispatch = useDispatch()
    const {cartItems} = useSelector(store => store.cart)

    useEffect(() => {
        dispatch(getTotalAmount())
    }, [cartItems])

    useEffect(() => {
        dispatch(getAllCandleafs())
    }, [])
    
    return (
    <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/products/:id' element={<SingleProductPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/products' element={<ProductsPage />}/>
            <Route path='/authentication' element={<AuthenticationPage />} />
            <Route path='/shipping' element={<ShippingPage />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element = {<SignIn />} />
        </Routes>
    </Router>
    );
}

export default App;