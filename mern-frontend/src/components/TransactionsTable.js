import React from 'react';

const TransactionsTable = ({ transactions, month, search, onSearchChange, onPageChange }) => {
    return (
        <div>
            <h2>Transactions Table</h2>
            <div>
                <label>Select Month: </label>
                <select value={month} onChange={(e) => setMonth(e.target.value)}>
                    {/* Options for months */}
                </select>
                <input type="text" value={search} onChange={onSearchChange} placeholder="Search transactions..." />
            </div>
            <table>
                {/* Table headers and rows for transactions */}
            </table>
            <div>
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default TransactionsTable;
