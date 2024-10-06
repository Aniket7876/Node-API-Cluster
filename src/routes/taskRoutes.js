const express = require('express');
const taskController = require('../controllers/taskController');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/task', rateLimiter, taskController.processTask);

module.exports = router;
