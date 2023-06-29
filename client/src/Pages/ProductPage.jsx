import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Products} from "../context/index.js";
import productsServices from "../API/productsServices.js";

const ProductPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState(true)
    const params = useParams()
    useEffect(() => {
        productsServices.getOne(params.id).then((res) => {
            setProduct(res.data)
            setIsLoading(false)
        })
    }, [])
    return (<>
        {!isLoading && <div>
            <h1>{product.title}</h1>
            <div style={{width: 300, maxHeight: 200}}>
                <img style={{width: 300, maxHeight: 400, objectFit: 'contain'}}
                   src={`http://localhost:3000/images/${product.img}`}
                   alt={product.title}
                />
            </div>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <h3>{product.price} UAH</h3>
        </div>}
    </>);
};

export default ProductPage;