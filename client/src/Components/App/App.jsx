import React, {useState} from 'react';
import '../../Components/App/App.css'
import {Products} from "../../context";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "../../Pages/Main.jsx";
import {myRoutes} from '../../router/index.jsx';
const App = () => {
    const [productValue, setProductValue] = useState([]);
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