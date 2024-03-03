import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/cart/cartSlice'
import { useFetch } from './Custom hooks/useFetch'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SingleProduct = () => {
    const { id } = useParams();
    const [amount, setAmount] = useState(1);    
    // const [isAdd, setIsAdd] = useState(false)
    const dispatch = useDispatch()
    // const [data, loading] = useFetch(`https://candleafs-api-1311.herokuapp.com/api/v1/candleafs/`+ id)
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchData(`https://candleafs-api-1311.herokuapp.com/api/v1/candleafs/`+ id)
    }, [])

    const fetchData = async(url) => {
        setLoading(true)
        try {
            const response = await fetch(url)
            const dataResponse = await response.json()
            if(dataResponse){
                setData(dataResponse)
            }
            setLoading(false)
            
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const increaseAmount = () => {
        setAmount(amount + 1) ;
    }

    const decreaseAmount = () => {
        if(amount === 1){
            setAmount(1)
        } else {
            setAmount(amount - 1)
        }
    }

    const notify = (id, amount) => {
        toast.success('Add to cart successfully !!!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        dispatch(addItem({id, amount}))
    }
    if(loading){
        return <div className='loading'></div>
    } else {
        const {img, name, price} = data.candleaf;
        return (
            <div className='single-product'>
                <div className='single-product-container'>
                    <div className='single-product-header'>
                        <img srcSet={`${img} 4x`} alt={name} className='single-product-header__img'/>
                        <h2 className='single-product-header__subtitle'>All hand-made with natural soy wax, Candleaf is made for your pleasure moments.</h2>
                        <p className='single-product-header__free-ship'>FREE SHIPPING</p>
                    </div>
                    <div className='single-product-info'>
                        <h2 className='single-product-info__name'>{name} Candleaf®</h2>
                        <div className='single-product-info__price-category-container'>
                            <div className='single-product-info__price-container'>
                                <p className='single-product-info__price'>${price}</p>
                                <div className='single-product-info__quantity'>
                                    <p className='quanlity-title'>Quantity</p>
                                    <div className='single-product-info__amount-btn'>
                                        <button onClick={increaseAmount}><i className='fas fa-plus'></i></button>
                                        <p className='amount'>{amount}</p>
                                        <button onClick={decreaseAmount}><i className='fas fa-minus'></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className='single-product-info__category-container'>
                                <div className='category1-container'>
                                    <input type="radio" className='category1' name="category"/>
                                    <label>One time purchase</label>
                                </div>
                                <div className='category2-container'>
                                    <input type="radio" className='category2' name="category" />
                                    <label>Subscribe and delivery every</label>
                                    <select className='delivery-time'>
                                            <option value="1 weeks">1 weeks</option>
                                            <option value="2 weeks">2 weeks</option>
                                            <option value="3 weeks">3 weeks</option>
                                            <option value="4 weeks">4 weeks</option>
                                    </select>    
                                    
                                    <p className='subscribe-text'>Subscribe now and get the 10% of discount on every recurring order.  The discount will be applied at checkout. <span>See details</span></p>
                                </div>
                                <button className='single-product-info__add-btn' onClick={() => notify(id, amount)}>
                                    <i className="fas fa-shopping-cart"></i>+ Add to cart   
                                </button>
                            </div>
                        </div>         
                        <div className='single-product-info__extra-informations'>
                            <p><span>Wax:</span> Top grade Soy wax that delivers a smoke less,  consistent burn</p>
                            <p><span>Fragrance:</span> Premium quality ingredients with natural essential oils</p>
                            <div className='info'>
                                <p><span>Burning Time:</span> 70-75 hours</p>
                                <p><span>Dimension:</span> 10cm x 5cm </p>
                                <p><span>Weight:</span> 400g </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className={`${isAdd && 'toast'}`}>
                    <i className="fas fa-check"></i>
                    <span>Add to cart successfully</span>
                </div> */}
                <ToastContainer />
            </div>
        )
    }
    
}
