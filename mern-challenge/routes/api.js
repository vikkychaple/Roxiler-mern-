const express = require('express');
const axios = require('axios');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Initialize database with seed data
router.get('/initialize', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        await Transaction.deleteMany({});
        await Transaction.insertMany(transactions);

        res.status(200).json({ message: 'Database initialized with seed data' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// List all transactions with search and pagination
router.get('/transactions', async (req, res) => {
    try {
        const { page = 1, perPage = 10, search = '', month } = req.query;
        const searchRegex = new RegExp(search, 'i');
        const transactions = await Transaction.find({
            $and: [
                {
                    dateOfSale: {
                        $gte: new Date(`${month} 1, 2023`),
                        $lt: new Date(`${month} 1, 2024`)
                    }
                },
                {
                    $or: [
                        { title: searchRegex },
                        { description: searchRegex },
                        { price: searchRegex }
                    ]
                }
            ]
        })
            .skip((page - 1) * perPage)
            .limit(Number(perPage));

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get statistics
router.get('/statistics', async (req, res) => {
    try {
        const { month } = req.query;
        const transactions = await Transaction.find({
            dateOfSale: {
                $gte: new Date(`${month} 1, 2023`),
                $lt: new Date(`${month} 1, 2024`)
            }
        });

        const totalSaleAmount = transactions.reduce((acc, curr) => acc + curr.price, 0);
        const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
        const totalNotSoldItems = transactions.filter(transaction => !transaction.sold).length;

        res.status(200).json({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get bar chart data
router.get('/barchart', async (req, res) => {
    try {
        const { month } = req.query;
        const transactions = await Transaction.find({
            dateOfSale: {
                $gte: new Date(`${month} 1, 2023`),
                $lt: new Date(`${month} 1, 2024`)
            }
        });

        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0
        };

        transactions.forEach(transaction => {
            const price = transaction.price;
            if (price <= 100) priceRanges['0-100']++;
            else if (price <= 200) priceRanges['101-200']++;
            else if (price <= 300) priceRanges['201-300']++;
            else if (price <= 400) priceRanges['301-400']++;
            else if (price <= 500) priceRanges['401-500']++;
            else if (price <= 600) priceRanges['501-600']++;
            else if (price <= 700) priceRanges['601-700']++;
            else if (price <= 800) priceRanges['701-800']++;
            else if (price <= 900) priceRanges['801-900']++;
            else priceRanges['901-above']++;
        });

        res.status(200).json(priceRanges);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get pie chart data
router.get('/piechart', async (req, res) => {
    try {
        const { month } = req.query;
        const transactions = await Transaction.find({
            dateOfSale: {
                $gte: new Date(`${month} 1, 2023`),
                $lt: new Date(`${month} 1, 2024`)
            }
        });

        const categoryCounts = transactions.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json(categoryCounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get combined data
router.get('/combined', async (req, res) => {
    try {
        const { month } = req.query;

        const transactionsResponse = await axios.get(`http://localhost:5000/api/transactions?month=${month}`);
        const statisticsResponse = await axios.get(`http://localhost:5000/api/statistics?month=${month}`);
        const barChartResponse = await axios.get(`http://localhost:5000/api/barchart?month=${month}`);
        const pieChartResponse = await axios.get(`http://localhost:5000/api/piechart?month=${month}`);

        res.status(200).json({
            transactions: transactionsResponse.data,
            statistics: statisticsResponse.data,
            barChart: barChartResponse.data,
            pieChart: pieChartResponse.data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
