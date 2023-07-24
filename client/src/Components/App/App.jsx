import React, {useState} from 'react';
import '../../Components/App/App.css'
import AppRouter from "./AppRouter.jsx";
import {AdminComponent, Products} from "../../context/index.jsx";
import {BrowserRouter} from "react-router-dom";
const App = () => {
    const [productValue, setProductValue] = useState([]);
    return (
        <div className="App">
            <Products.Provider value={[productValue, setProductValue]}>
                <AdminComponent>
                    <BrowserRouter>
                        <AppRouter/>
                    </BrowserRouter>
                </AdminComponent>
            </Products.Provider>
        </div>
    );
};
export default App;