const express = require('express');
const { body, params } = require('express-validator/check');

const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

//For Movie
router.get('/get-movies', authMiddleware.veryfiToken, adminController.getMovie);

router.post('/add-movie', [
    body('title')
        .exists()
        .withMessage('Movie title is required!'),
    body('price')
        .exists()
        .withMessage('Movie price is required!')
        .isInt()
        .withMessage('Must input number or integer in price!'),
    authMiddleware.veryfiToken],
    adminController.addMovie);

router.put('/edit-movie/:movieId', [
    param('movieId')
        .exists()
        .withMessage('movieId is required.'),
    body('title')
        .exists()
        .withMessage('Movie title is required!'),
    body('price')
        .exists()
        .withMessage('Movie price is required!')
        .isInt()
        .withMessage('Must input number or integer in price!'),
    authMiddleware.veryfiToken,
    adminMiddleware.checkMovie],
    adminController.editMovie);

router.delete('/delete-movie/:movieId', [
    authMiddleware.veryfiToken,
    adminMiddleware.checkMovie],
    adminController.deleteMovie);

//For Room
// router.get('/get-rooms', adminController);
// router.post('/add-room', adminController);
// router.put('/edit-room/:roomId', adminController);
// router.delete('/delete-room/:roomId', adminController);

//For User & Admin
// router.get('/get-users', adminController);
// router.post('/add-user', adminController);
// router.put('/edit-user/:userId', adminController);
// router.delete('/delete-user/:userId', adminController);


module.exports = router;