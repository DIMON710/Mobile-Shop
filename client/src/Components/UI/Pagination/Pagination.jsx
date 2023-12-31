import React from 'react';
import cl from "./Pagination.module.scss";
import {useNavigate} from "react-router-dom";

const Pagination = ({currentPage, totalPage, endpoint}) => {
    const navigate = useNavigate();
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
    }
    return (
        <div className={cl.wrapper}>
            {pages.length > 1 && pages.map((page) => (
                <button key={page} onClick={() => {
                    navigate(`${endpoint + page}`)
                    window.scrollTo(0,0)
                }} style={page == currentPage ? {borderColor: '#646cff'} : {}} className={cl.pagination}>{page}</button>
            ))}
        </div>
    );
};

export default Pagination;