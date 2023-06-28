import React, {useContext} from "react";
import Product from "../../Components/App/Product/Product.jsx";
import {BasketProduct, Products} from "../../context/index.js";
import AddProduct from "../../Components/App/AddProduct/AddProduct.jsx";
import cl from "./Catalog.module.scss";

const Catalog = () => {
    const [productValue] = useContext(Products);
    const [basketProduct, setBasketProduct] = useContext(BasketProduct);
    const basketFunc = (id) => {
        const index = productValue.findIndex(item => item.id === id);
        if ((basketProduct.findIndex(item => item.id === index) === -1))
            setBasketProduct([...basketProduct, productValue[index]]);
    }
    return (
        <div className={cl.catalog}>
            <AddProduct/>
            <div className={cl.productList}>
                {productValue.map(item => (
                    <Product key={item.id} buttonFunc={basketFunc} item={item} btnName={'В корзину'}/>
                    ))}
            </div>
        </div>
    )
}
export default Catalog;