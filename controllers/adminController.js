const { validationRequest } = require('express-validator/check');
const Movie = require('../models/movie');


exports.addMovie = async (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;

    const movie = new Movie({
        title: title,
        price: price,
        description: description
    });
    try {
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