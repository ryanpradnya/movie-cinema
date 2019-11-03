const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Movie = require('../models/movie');
const Ticket = require('../models/ticket');
const Room = require('../models/room');
const Order = require('../models/order');

exports.movieList = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error
        }

        const movies = await Movie.find();

        if (!movies) {
            const error = new Error('Movie list not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Fetch movie list successfully',
            movieList: movies
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
};

exports.getOrder = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error
        }

        const userId = req.userId
        const order = await Order.find({ userId: userId, isPaid: false });

        if (!order) {
            const error = new Error('Order list not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Fetch order list successfully',
            orderList: order
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
};

exports.addOrder = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error
        }

        const userId = req.userId
        const movieId = req.params['movieId'];
        const user = await User.findById(userId);
        const userName = user.firstName + user.lastName
        const movie = await Movie.findById(movieId);
        const movieTitle = movie.title;
        const order = new Order({
            userId: userId,
            userName: userName,
            movieId: movieId,
            movieTitle: movieTitle,
            isPaid: false
        });
        const orderResult = await order.save();
        res.status(201).json({
            message: 'Movie ordered successfully',
            order: orderResult
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
};

exports.deleteOrder = async (req, res, next) => {
    const errors = validationResult(req);
    const orderId = req.params['orderId'];

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error
        }
        const order = await Order.findById(orderId);
        await Order.findByIdAndDelete(orderId);
        res.status(200).json({
            message: 'Delete order successfully',
            orderDeleted: order
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
};

exports.paidOrder = async (req, res, next) => {
    const errors = validationResult(req);
    const orderId = req.params['orderId'];

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error
        }
        const order = await Order.findById(orderId);
        order.isPaid = true
        const result = await order.save();
        res.status(200).json({
            message: 'Paid successfully',
            order: result
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    };
};


exports.updateProfile = async (req, res, next) => {
    const errors = validationResult(req);


    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array()
            throw error
        }
        const newEmail = req.body.email;
        const newMobilePhone = req.body.mobilePhone;
        const newFirstName = req.body.firstName;
        const newLastName = req.body.lastName;
        let newPassword;
        if (req.isNewPassword) {
            const password = req.body.password;
            newPassword = await bcrypt.hashSync(password, 12);
        } else {
            newPassword = req.body.password;
        }

        const updatedUser = await User.findByIdAndUpdate(req.userId, {
            email: newEmail,
            password: newPassword,
            mobilePhone: newMobilePhone,
            firstName: newFirstName,
            lastName: newLastName
        }, { new: true });

        res.status(200).json({
            message: 'User updated!',
            user: updatedUser
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
};