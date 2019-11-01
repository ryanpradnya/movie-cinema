const express = require('express');
const { body } = require('express-validator/check');

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/movie-list', authMiddleware.veryfiToken, userController.movieList);

router.get('/get-order', authMiddleware.veryfiToken, userController.getOrder);

router.post('/add-order/:movieId', authMiddleware.veryfiToken, userController.addOrder);

router.delete('/delete-order/:movieId', authMiddleware.veryfiToken, userController.deleteOrder);

router.put('/pay-order/:orderId', authMiddleware.veryfiToken, userController.paidOrder);

router.put('/update-profile', authMiddleware.veryfiToken, userController.updateProfile);

module.exports = router;