import React, {useContext, useState} from 'react';
import cl from './AddProduct.module.scss';
import {Products} from "../../../context/index.js";
const AddProduct = () => {
    const [newProduct, setNewProduct] = useState({title: '', description: '', price: ''});
    const [newProductPhoto, setNewProductPhoto] = useState(null);
    const [productValue, setProductValue] = useContext(Products);

    const addProduct = (e) => {
        e.preventDefault();
        if (newProduct.title !== '' && newProduct.description !== '' && newProduct.price !== '') {
            const formData = new FormData();
            formData.append('img', newProductPhoto);
            formData.append('test', 'ok');
            console.log(newProductPhoto)
                // req
            // setNewProductPhoto(null)
            setProductValue(prevState => ([...prevState, {...newProduct, id: Date.now()}]))
            setNewProduct({title: '', description: '', price: ''})
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
            <button type="submit">Добавить</button>
        </form>
    );
};

export default AddProduct;