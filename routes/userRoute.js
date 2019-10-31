const express = require('express');
const { body } = require('express-validator/check');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/movie-list', userController.movieList);

router.get('/movie-detail', userController.movieDetail);

router.post('/add-order', userController.addOrder);

router.delete('/delete-order', userController.deleteOrder);

router.post('/paid-order', userController.paidOrder);

router.put('/update-profile', userController.updateProfile);

module.exports = router;