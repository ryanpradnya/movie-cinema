const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/authController');

const router = exports.Router();

router.put('/signup', authController)

module.exports = router;