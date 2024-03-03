import React, {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
// import { useFetch } from './Custom hooks/useFetch'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReactPaginate from 'react-paginate';

export const Products = (props) => {
    const [searchName, setSearchName] = useState('')
    const [color, setColor] = useState('all')
    const [sort, setSort] = useState('price')
    const [category, setCategory] = useState('all')
    const [colorActive, setColorActive] = useState('all')
    const searchInputRef = useRef()
    // const [data, loading] = useFetch(`https://candleafs-api-1311.herokuapp.com/api/v1/candleafs?name=${searchName}&color=${color}&sort=${sort}&category=${active}&limit=${props.number}&popular=${props.popular}`)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const {datas, isLoading} = useSelector((store) => store.cart)
    const [pageCount, setPageCount] = useState(4);
    const [currentPage, setCurrentPage] = useState(1)
    let itemsPerPage = 9;

    useEffect(() => {
        fetchData(`https://candleafs-api-1311.herokuapp.com/api/v1/candleafs?name=${searchName}&color=${color}&sort=${sort}&category=${category}&limit=${props.number||itemsPerPage}&popular=${props.popular}&page=${currentPage}`)
    }, [searchName, color, sort, category, pageCount, currentPage])

    const fetchData = async(url) => {
        setLoading(true)
        try {
            setPageCount(Math.ceil(datas.length / itemsPerPage) || 4);
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

    const chooseColor = (e, type) => {
        e.preventDefault();
        setColor(type)
        setColorActive(type)
    }

    const clearFilters = (e) => {
        e.preventDefault()
        setColor('')
        setSearchName('')
        setColorActive('all')
        setCategory('all')
    }

    const chooseSort = (value) => {
        setSort(value)
    }

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        if(window.innerWidth > 1000)
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        setCurrentPage(event.selected + 1)
        
    };

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 0,
        autoplaySpeed: 4000,
        autoplay: true,
        pauseOnHover: true,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2,
                dots: false
            }
        }
        ]
    };
    
    if(loading && (props.number || props.popular)){
        return <React.Fragment></React.Fragment>
    }

    if(props.number && !loading){
            return <div>
                <div className='products-container'>
                    <div className='products-header'>
                        <h1 className='products-header__title'>Products</h1>
                        <p className='products-header__subtitle'>Order it for you or for your beloved ones</p>
                    </div>
                    <div className='products-list'> 
                        {data.candleafs.map(product => {
                            const {_id, img, name, price} = product
                            return <Link to={`/products/${_id}`} className='product' key={_id}>
                                <img srcSet = {`${img} 4x`} alt={name} className='product__img'/>
                                <h3 className='product__name'>{name}</h3>
                                <p className='product__price'>{price}$</p>
                            </Link>
                        })}
                    </div>
                </div>
            </div>
        }
        else if(props.popular && !loading){
            return <div className='popular-products'>
                    <div className='products-container'>
                        <div className='products-header'>
                            <h1 className='products-header__title'>Popular</h1>
                            <p className='products-header__subtitle'>Our top selling product that you may like</p>
                        </div>
                        <div className='popular-products-list'>
                            <Slider {...settings}>
                                {data.candleafs.map(product => {
                                    const {_id, img, name, price} = product
                                    return <Link to={`/products/${_id}`} className='product' key={_id} style={{width: "255px", height: "300px"}}>
                                        <img srcSet = {`${img} 4x`} alt={name} className='product__img'/>
                                        <h3 className='product__name'>{name}</h3>
                                        <p className='product__price'>{price}$</p>
                                    </Link>
                                })}
                            </Slider>    
                        </div>
                    </div>
                </div>
        } else   
            return (
                <div className='products'>
                    <div className='products-container'>
                        <div className='products-header'>
                            <h1 className='products-header__title'>Products</h1>
                            <p className='products-header__subtitle'>Order it for you or for your beloved ones</p>
                        </div>
                        <div className="content-products">
                            <div className="content">
                                <form className='form-container'>
                                    <div className="form-control">
                                        <input type="text" ref={searchInputRef} value={searchName} placeholder="search" className="search-input" onChange={(e) => setSearchName(e.target.value)}/>
                                    </div>
                                    <div className="form-control">
                                        <h5>Category</h5>
                                        <div className='form-control__category'>
                                            <button type="button" id="all" className={`${category === 'all' ? 'cate-active': 'null'} cate-btn`} onClick={() => setCategory('all')}>All</button>
                                            <button type="button" id="office" className={`${category === 'office' ? 'cate-active': 'null'} cate-btn`} onClick={() => setCategory('office')}>Office</button>
                                            <button type="button" id="living-room" className={`${category === 'lr' ? 'cate-active': 'null'} cate-btn`} onClick={() => setCategory('lr')}>Living room</button>
                                            <button type="button" id="bedroom" className={`${category === 'bedroom' ? 'cate-active': 'null'} cate-btn`} onClick={() => setCategory('bedroom')}>Bedroom</button>
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <h5>Colors</h5>
                                        <div className="form-control__colors">
                                            <button className={`${colorActive === 'all' ? 'color-active': 'null'} all-btn`} onClick={(e) => chooseColor(e, 'all')}>All</button>
                                            <button className={`${colorActive === 'green' ? 'color-active': 'null'} color-btn`} style={{backgroundColor: "green"}} onClick={(e) => chooseColor(e, 'green')}></button>
                                            <button className={`${colorActive === 'pink' ? 'color-active': 'null'} color-btn`} style={{backgroundColor: "pink"}} onClick={(e) => chooseColor(e, 'pink')}></button>
                                            <button className={`${colorActive === 'orange' ? 'color-active': 'null'} color-btn`} style={{backgroundColor: "orange"}} onClick={(e) => chooseColor(e, 'orange')}></button>
                                            <button className={`${colorActive === 'yellow' ? 'color-active': 'null'} color-btn`} style={{backgroundColor: "yellow"}} onClick={(e) => chooseColor(e, 'yellow')}></button>
                                            <button className={`${colorActive === 'red' ? 'color-active': 'null'} color-btn`} style={{backgroundColor: "red"}} onClick={(e) => chooseColor(e, 'red')}></button>
                                            <button className={`${colorActive === 'brown' ? 'color-active': 'null'} color-btn`} style={{backgroundColor: "brown"}} onClick={(e) => chooseColor(e, 'brown')}></button>
                                            <button className={`${colorActive === 'purple' ? 'color-active': 'null'} color-btn`} style={{backgroundColor: "purple"}} onClick={(e) => chooseColor(e, 'purple')}></button>
                                            <button className={`${colorActive === 'blue' ? 'color-active': 'null'} color-btn`} style={{backgroundColor: "blue"}} onClick={(e) => chooseColor(e, 'blue')}></button>
                                        </div>
                                    </div>
                                </form>
                                <button type="button" className="clear-btn" onClick={clearFilters}>Clear filters</button>
                                <form className='form-container form-sort'>
                                    <label htmlFor="sort">Sort By</label>
                                    <select name="sort" id="sort" className="sort-input" onChange = {(e) => chooseSort(e.target.value)}>
                                        <option value="price">Price (Lowest)</option>
                                        <option value="-price">Price (Highest)</option>
                                        <option value="name">Name (A - Z)</option>
                                        <option value="-name">Name (Z - A)</option>
                                    </select>
                                </form>
                            </div>
                        {!loading ? <div>
                            {data.candleafs.length > 0 ? <div className='products-list'>    
                                {data.candleafs.map(product => {
                                    const {_id, img, name, price} = product
                                    return <Link to={`/products/${_id}`} className='product' key={_id}>
                                        <img srcSet = {`${img} 4x`} alt={name} className='product__img'/>
                                        <h3 className='product__name'>{name}</h3>
                                        <p className='product__price'>{price}$</p>
                                    </Link>
                                })}
                                </div>:<div>
                                        <p style={{paddingLeft: '15px'}}>Sorry, no products matched your search.</p>
                                </div>}
                            </div>: <p style={{paddingLeft: '15px'}}>Loading...</p>}
                        </div>

                    </div>
                    <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageCount={pageCount}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            )
}
