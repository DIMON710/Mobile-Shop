import React, {useState} from 'react';
import '../../Components/App/App.css'
import AppRouter from "./AppRouter.jsx";
import {AdminComponent, Products} from "../../context/index.jsx";
import {HashRouter} from "react-router-dom";
const App = () => {
    const [productValue, setProductValue] = useState([]);
    return (
        <div className="App">
            <Products.Provider value={[productValue, setProductValue]}>
                <AdminComponent>
                    <HashRouter>
                        <AppRouter/>
                    </HashRouter>
                </AdminComponent>
            </Products.Provider>
        </div>
    );
};
export default App;