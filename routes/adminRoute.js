const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/adminController');

const router = express.Router();

//For Movie
// router.get('/get-movies', adminController);
router.post('/add-movie', adminController.addMovie);
// router.put('/edit-movie/:movieId', adminController);
// router.delete('/delete-movie/:movieId', adminController);

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