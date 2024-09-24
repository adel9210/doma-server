const jwt = require('jsonwebtoken');
const config = require('../config/constants');
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ status: false, message: 'unAuthorized User' });
    }


    jwt.verify(token, config.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ status: false, message: 'Invalid token' });
        }

        req.user = user; // Attach user info to the request
        next(); // Proceed to the next middleware
    });
};

module.exports = authenticateToken;
