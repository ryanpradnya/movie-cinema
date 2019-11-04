const Movie = require('../models/movie');

exports.checkMovie = async (req, res, next) => {
    const movieId = req.params['movieId']
    try {
        const movie = Movie.findById(movieId);
        if (!movie) {
            const error = new Error('Movie not found!');
            error.statusCode = 404;
            throw error;
        } else {
            req.movie = movie;
        }
        next()

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }

};