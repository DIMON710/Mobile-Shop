import React, {useContext, useRef, useState} from 'react';
import cl from './AddProduct.module.scss';
import {Products} from "../../../context/index.js";
import productsServices from "../../../API/productsServices.js";
const AddProduct = () => {
    const [newProduct, setNewProduct] = useState({title: '', description: '', price: ''});
    const [newProductPhoto, setNewProductPhoto] = useState(null);
    const [productValue, setProductValue] = useContext(Products);
    const [validation, setValidation] = useState(true);
    const addProduct = (e) => {
        e.preventDefault();
        if (newProduct.title !== '' && newProduct.description !== '' && !isNaN(newProduct.price) && newProductPhoto) {
            setValidation(true)
            const formData = new FormData();
            formData.append('image', newProductPhoto);
            Object.keys(newProduct).forEach((key) => {
                formData.append(key, newProduct[key]);
            });
            const id = Date.now()
            setProductValue(prevState => ([...prevState, {...newProduct, id}]))
            try {
                productsServices.addNew(formData).then(() => {
                    productsServices.getAll().then((res) => {
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
        <form className={cl.form} onSubmit={addProduct}>
            <label>Фото <input type="file" accept="image/*" onChange={ e => {
                const file = e.target.files[0];
                if (file.type.split('/')[0] === 'image') {
                    setNewProductPhoto(file)
                }
            }}/></label>
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
    );
};

export default AddProduct;