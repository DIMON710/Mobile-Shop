import React, {useContext, useEffect, useState} from "react";
import Product from "../../Components/App/Product/Product.jsx";
import {BasketProduct, Products} from "../../context/index.js";
import cl from "./Catalog.module.scss";
import "../../Components/App/AddProduct/transitionCatalog.scss";
import productsServices from "../../API/productsServices.js";
import AddProduct from "../../Components/App/AddProduct/AddProduct.jsx";
import Loader from "../../Components/Loader/Loader.jsx";
import {useNavigate, useParams} from "react-router-dom";
import Pagination from "../../Components/App/Product/Pagination/Pagination.jsx";

const Catalog = () => {
    const [productValue, setProductValue] = useContext(Products);
    const [basketProduct, setBasketProduct] = useContext(BasketProduct);
    const [admin, setAdmin] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const {page} = useParams();
    const [totalPage, setTotalPage] = useState(0)
    const limit = 4;
    useEffect( () => {
        if (isNaN(page) || page < 1) {
            navigate('/1')
        }
        try {
            productsServices.getAllPage(page).then((products) => {
                setTotalPage(Math.ceil(products.data.count / limit))
                setProductValue(products.data.rows);
                setIsLoading(false)
                if (page > Math.ceil(products.data.count / limit)) {
                    navigate(`/${Math.ceil(products.data.count / limit)}`);
                }
            });
        } catch (e) {
            console.error(e);
        }
    }, [page, productValue]);
    const basketFunc = (id) => {
        const index = productValue.findIndex(item => item.id === id);
        if ((basketProduct.findIndex(item => item.id === id) === -1))
            setBasketProduct([...basketProduct, productValue[index]]);
    }
    return (
        <div className={cl.catalog}>
            <button style={{position: 'absolute', top: 10, left: 20}} onClick={() => setAdmin(prevState => !prevState)}>admin?</button>
            <AddProduct admin={admin}/>
            {isLoading ? <Loader/>
            :   <div>
                    <div className={cl.productList}>
                        {productValue.length !== 0 && productValue.map(item => (
                            <Product key={item.id} id={item.id} admin={admin} buttonFunc={basketFunc} item={item}
                                     btnName={'В корзину'}/>
                        ))}
                    </div>
                    <Pagination currentPage={page} totalPage={totalPage}/>
                </div>}
        </div>
    )
}
export default Catalog;