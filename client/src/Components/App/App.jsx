import React, {useState} from 'react';
import '../../Components/App/App.css'
import {Products} from "../../context";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "../../Pages/Main.jsx";
import {myRoutes} from '../../router/index.jsx';
const App = () => {
    const [productValue, setProductValue] = useState([
        {
            id: 0,
            title: 'Xiaomi Redmi Note 10 Pro',
            description: '6/128 GB, 6.67" 2400x1080, Qualcomm Snapdragon 732G + Adreno 618, камера 108Мп/16мп, 5020мАч',
            price: 9999,
            img: '/src/assets/img/Xiaomi Redmi Note 10 Pro.jpg'
        },
        {
            id: 1,
            title: 'Xiaomi Redmi 10',
            description: '4/64 GB Blue',
            price: 6999,
            img: '/src/assets/img/Xiaomi Redmi 10.jpg'
        },
        {
            id: 2,
            title: 'Xiaomi Redmi Note 11',
            description: '4/64 GB',
            price: 7999,
            img: '/src/assets/img/Xiaomi Redmi Note 11.jpg'
        },
        {
            id: 3,
            title: 'Xiaomi 12 5G',
            description: '8/128GB Blue',
            price: 19999,
            img: '/src/assets/img/Xiaomi 12 5G.jpg'
        },
    ]);
    return (
        <div className="App">
            <Products.Provider value={[productValue, setProductValue]}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Main/>}>
                            {myRoutes.map((item, index) => {
                                item = {...item, key: index}
                                return item
                            })}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Products.Provider>
        </div>
    );
};
export default App;