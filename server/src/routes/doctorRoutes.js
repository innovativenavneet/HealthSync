const express = require('express');
const router = express.Router();
const DashboardService = require('../services/dashboardService'); // Example service layer

// GET /api/dashboard
router.get('/', async (req, res) => {
    try {
        // Fetch dashboard data (replace with actual MongoDB queries)
        const data = await DashboardService.getDashboardData();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
