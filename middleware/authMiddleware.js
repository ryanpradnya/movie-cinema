const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../util/config');
const User = require('../models/user');

exports.checkExistingEmail = async (req, res, next) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const error = new Error('Email is already use!');
            error.statusCode = 400;
            throw error;
        } else {
            next();
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.veryfiToken = (req, res, next) => {
    let authHeader = req.get('Authorization');

    let decodedToken;

    if (!authHeader) {
        const error = new Error('No token provided');
        error.statusCode = 403;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    try {
        decodedToken = jwt.verify(token, config.jwtSecret);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};

exports.updateProfileValidation = async (req, res, next) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    try {
        const user = await User.findById(req.userId)
        console.log('user:', user)
        if (!req.body.email) {
            req.body.email = user.email
        }
        if (!req.body.mobilePhone) {
            req.body.mobilePhone = user.mobilePhone
        }
        if (newPassword && newPassword.length < 6) {
            const error = new Error('New password length min 6 character!');
            error.statusCode = 411;
            throw error;
        } else if (newPassword && newPassword.length >= 6) {
            const passwordIsSimiliar = await bcrypt.compareSync(newPassword, user.password);
            if (passwordIsSimiliar) {
                const error = new Error('New password are using the same password as the existing password');
                error.statusCode = 403;
                throw error;
            } else {
                if (!oldPassword) {
                    const error = new Error('Old password required!');
                    error.statusCode = 404;
                    throw error;
                } else {
                    const passrowdIsValid = await bcrypt.compareSync(oldPassword, user.password);
                    if (!passrowdIsValid) {
                        const error = new Error('Wrong old passord!');
                        error.statusCode = 401;
                        throw error;
                    } else {
                        req.body.password = newPassword;
                        req.isNewPassword = true;
                    }
                }
            }
        } else {
            req.body.password = user.password;
            req.isNewPassword = false;
        }
        next();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};