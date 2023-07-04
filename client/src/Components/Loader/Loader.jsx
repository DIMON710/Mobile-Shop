import React from 'react';
import cl from  './Loader.module.scss';
const Loader = () => {
    return (
        <div className={cl.wrapper}>
            <div className={cl.loader}/>
            <div style={{animationDelay: '-0.5s'}} className={cl.loader}/>
        </div>
    );
};

export default Loader;