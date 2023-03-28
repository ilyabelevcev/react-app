import React from 'react';
import { usePagination } from '../../../hooks/usePagination';

const Pagination = ({totalPages, page, changePage}) => {
    const pageBtns = usePagination(totalPages)
    return (
        <div className='page__wrapper'>
            {pageBtns.map(btn => 
                <span 
                    onClick={() => changePage(btn)}
                    className={page === btn ? 'page page__current' : 'page'} 
                    key={btn}
                >
                    {btn}
                </span>
            )}
        </div>
    );
}

export default Pagination;
