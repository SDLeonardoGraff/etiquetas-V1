import React from 'react';
import styles from './pagination.module.css';

const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className={styles.pagination}>
            <ul className={styles.paginationList}>
                {pageNumbers.map(number => (
                    <li key={number} className={styles.pageItem}>
                        <button
                            onClick={() => onPageChange(number)}
                            className={`${styles.pageLink} ${number === currentPage ? styles.active : ''}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
