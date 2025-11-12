const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const User = require('../models/User');
const Department = require('../models/Department');
const Attendance = require('../models/Attendance');

// Public stats endpoint — aggregated counts safe to expose
// GET /api/stats/public
router.get('/public', async (req, res) => {
  try {
    const totalEmployees = await User.count({ where: { role: { [Op.ne]: 'Admin' } } });
    const departmentsCount = await Department.count();
    const today = new Date().toISOString().slice(0,10);
    const presentToday = await Attendance.count({ where: { date: today, status: 'present' } });

    res.json({ success: true, data: { totalEmployees, departmentsCount, presentToday } });
  } catch (err) {
    console.error('GET /api/stats/public error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
