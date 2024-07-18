import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChartComponent from './components/BarChartComponent';
import PieChartComponent from './components/PieChartComponent';

const App = () => {
    const [month, setMonth] = useState('March');
    const [transactions, setTransactions] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [barChartData, setBarChartData] = useState({});
    const [pieChartData, setPieChartData] = useState({});
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData();
    }, [month, currentPage, searchText]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/transactions`, {
                params: {
                    month,
                    search: searchText,
                    page: currentPage
                }
            });
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h1>MERN Stack Coding Challenge</h1>
            <TransactionsTable
                transactions={transactions}
                month={month}
                search={searchText}
                onSearchChange={handleSearchChange}
                onPageChange={handlePageChange}
            />
            <Statistics statistics={statistics} />
            <BarChartComponent barChartData={barChartData} month={month} />
            <PieChartComponent pieChartData={pieChartData} month={month} />
        </div>
    );
};

export default App;
