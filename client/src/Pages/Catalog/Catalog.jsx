import React, {useContext, useEffect, useState} from "react";
import Product from "../../Components/App/Product/Product.jsx";
import {BasketProduct, Products} from "../../context/index.js";
import cl from "./Catalog.module.scss";
import "../../Components/App/AddProduct/transitionCatalog.scss";
import productsServices from "../../API/productsServices.js";
import AddProduct from "../../Components/App/AddProduct/AddProduct.jsx";

const Catalog = () => {
    const [productValue, setProductValue] = useContext(Products);
    const [basketProduct, setBasketProduct] = useContext(BasketProduct);
    const [admin, setAdmin] = useState(false)
    useEffect( () => {
        try {
            productsServices.getAll().then((products) => {
                setProductValue(products.data.rows);
                if (localStorage.getItem('basketProducts')) {
                    const basketProductsId = JSON.parse(localStorage.getItem('basketProducts'))
                    const basketProducts = products.data.rows.filter(product => basketProductsId.includes(product.id))
                    setBasketProduct(basketProducts)
                }
            });
        } catch (e) {
            console.log(e);
        }
    }, []);
    const basketFunc = (id) => {
        const index = productValue.findIndex(item => item.id === id);
        if ((basketProduct.findIndex(item => item.id === id) === -1))
            setBasketProduct([...basketProduct, productValue[index]]);
    }
    return (
        <div className={cl.catalog}>
            <button style={{position: 'absolute', top: 10, left: 20}} onClick={() => setAdmin(prevState => !prevState)}>admin?</button>
            <AddProduct admin={admin}/>
            <div className={cl.productList}>
                {productValue.length !== 0 && productValue.map(item => (
                    <Product key={item.id} id={item.id} admin={admin} buttonFunc={basketFunc} item={item} btnName={'В корзину'}/>
                    ))}
            </div>
        </div>
    )
}
export default Catalog;