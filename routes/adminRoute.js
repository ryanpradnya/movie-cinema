const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/adminController');

const router = express.Router();


router.post('/add-movie', adminController.addMovie);

module.exports = router;