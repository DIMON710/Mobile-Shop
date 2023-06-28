import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import {Products} from "../context/index.js";

const ProductPage = () => {
    const [products] = useContext(Products)
    const params = useParams()
    const productId = params.id
    const product = products[products.findIndex(i => i.id.toString() === productId)]
    return (
        <div>
            <h1>{product.title}</h1>
            <div style={{width: 300, maxHeight: 200}}><img style={{width: 300, maxHeight: 400, objectFit: 'contain'}} src={product.img} alt={product.title}/></div>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <h3>{product.price} UAH</h3>
        </div>
    );
};

export default ProductPage;