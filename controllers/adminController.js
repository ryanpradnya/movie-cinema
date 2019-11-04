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
            message: 'Movie added successfully!',
            movie: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
};