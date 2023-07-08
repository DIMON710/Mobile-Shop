import React, {useContext, useRef, useState} from 'react';
import cl from './AddProduct.module.scss';
import './transitionCatalog.scss';
import {Products} from "../../../context/index.jsx";
import productsServices from "../../../API/productsServices.js";
import {CSSTransition} from "react-transition-group";
import {useParams} from "react-router-dom";
const AddProduct = ({admin}) => {
    const [newProduct, setNewProduct] = useState({title: '', description: '', price: ''});
    const [newProductPhoto, setNewProductPhoto] = useState(null);
    const [productValue, setProductValue] = useContext(Products);
    const [validation, setValidation] = useState(true);
    const refProduct = useRef(null);
    const {page} = useParams();
    const addProduct = (e) => {
        e.preventDefault();
        if (newProduct.title !== '' && newProduct.description !== '' && !isNaN(newProduct.price) && newProductPhoto) {
            setValidation(true)
            const formData = new FormData();
            formData.append('image', newProductPhoto);
            Object.keys(newProduct).forEach((key) => {
                formData.append(key, newProduct[key]);
            });
            try {
                productsServices.addNew(formData).then(() => {
                    productsServices.getAllPage(page).then((res) => {
                        setProductValue(res.data.rows)
                    })
                })
                setNewProduct({title: '', description: '', price: ''})
            } catch (e) {
                console.log(e)
            }
        } else {
            setValidation(false)
        }
    }
    return (
        <CSSTransition
            nodeRef={refProduct}
            in={admin}
            className="add-product"
            timeout={300}
            unmountOnExit
        >
            <div ref={refProduct}>
                <form className={cl.form} onSubmit={addProduct}>
                    <div className={cl.photo}>
                        <button type="button" className={`${cl.photo__btn} ${newProductPhoto && cl.active}`}>{newProductPhoto ? newProductPhoto.name : 'Добавить фото'}</button>
                        <input type="file" accept="image/*" onChange={ e => {
                            console.log(e.target.files[0].name)
                            const file = e.target.files[0];
                            if (file.type.split('/')[0] === 'image') {
                                setNewProductPhoto(file)
                            }
                        }}/>
                    </div>
                    <input onChange={(e) => {
                        setNewProduct(prevState => ({...prevState, title: e.target.value}))
                    }} value={newProduct.title} type="text" placeholder="Название"/>
                    <input onChange={(e) => {
                        setNewProduct(prevState => ({...prevState, description: e.target.value}))
                    }} value={newProduct.description} type="text" placeholder="Описание"/>
                    <input onChange={(e) => {
                        setNewProduct(prevState => ({...prevState, price: e.target.value}))
                    }} value={newProduct.price} type="text" placeholder="Цена"/>
                    <button style={!validation ? {border: '1px solid red'} : {}} type="submit">Добавить</button>
                </form>
            </div>
        </CSSTransition>
    );
};

export default AddProduct;