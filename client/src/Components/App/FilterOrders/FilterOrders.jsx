import React, {useRef} from 'react';
import cl from './FilterOrders.module.scss';
import './transitionFilter.scss';
import {CSSTransition} from "react-transition-group";
const FilterOrders = ({isOpenFilter, settings}) => {
    const refFilter = useRef(null);
    const [filtersOrders, setFiltersOrders] = settings;
    const changeFilter = (title) => {
        const index = filtersOrders.findIndex(filter => filter.title === title);
        let changedFilters = [...filtersOrders];
        changedFilters[index].checked = !changedFilters[index].checked;
        setFiltersOrders(changedFilters);
    }
    return (
        <CSSTransition
            nodeRef={refFilter}
            in={isOpenFilter}
            className="filter"
            timeout={300}
            unmountOnExit
        >
            <div ref={refFilter}>
                <div className={cl.filter}>
                    {filtersOrders.map(filter => (
                        <div key={filter.name} className={cl.item} onClick={() => changeFilter(filter.title)}><div className={`${cl.dot} ${filter.checked ? cl.selected : ''}`}></div><h4>{filter.title}</h4></div>
                    ))}
                </div>
            </div>
        </CSSTransition>
    );
};

export default FilterOrders;