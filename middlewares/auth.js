const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = authHeader.split(' ')[1];

    try {
        console.log('Token:', token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'YOUR_ACTUAL_JWT_SECRET');
        console.log('Decoded:', decoded);

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = { authMiddleware };
