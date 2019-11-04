const { validationResult } = require('express-validator/check');
const Movie = require('../models/movie');


exports.getMovie = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        throw error;
    }
    try {

        const movies = await Movie.find();
        res.status(200).json({
            message: 'Movie fetch successfully!',
            movies: movies
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
};

exports.addMovie = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const title = req.body.title;
        const price = req.body.price;
        let description = req.body.description;
        if (!description) {
            description = "No description"
        }

        const movie = new Movie({
            title: title,
            price: price,
            description: description
        });
        const result = await movie.save();
        res.status(201).json({
            message: 'Movie successfully added',
            movie: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
};

exports.editMovie = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const movieId = req.params['movieId'];
        const title = req.body.title;
        const price = req.body.price;
        let description = req.body.description;
        if (!description) {
            description = "No description"
        }

        const updatedMovie = await User.findByIdAndUpdate(movieId, {
            title: title,
            price: price,
            description: description
        }, { new: true });
        res.status(200).json({
            message: 'Movie updated!',
            user: updatedMovie
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
};

exports.deleteMovie = async (req, res, next) => {
    const errors = validationResult(req);
    const movieId = req.params['movieId'];

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error
        }
        await Movie.findByIdAndDelete(movieId);
        res.status(200).json({
            message: 'Delete movie successfully',
            deletedMovie: req.movie
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
};