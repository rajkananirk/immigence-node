const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(403).send({
            status: false,
            message: "No token provided!"
        });
    }

    // Remove Bearer from string if present
    const tokenString = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(tokenString, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).send({
                status: false,
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = {
    verifyToken
}; 