import React from 'react';

const Statistics = ({ statistics }) => {
    return (
        <div>
            <h2>Transactions Statistics</h2>
            <div>
                <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
                <p>Total Sold Items: {statistics.totalSoldItems}</p>
                <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
            </div>
        </div>
    );
};

export default Statistics;
