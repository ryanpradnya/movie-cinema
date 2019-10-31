const { validationResult } = require('express-validator/check');
const bcrypt = require('body-parser');
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

exports.movieDetail = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error
        }

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

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
};

exports.deleteOrder = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error
        }

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
};

exports.paidOrder = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error
        }

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

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
};