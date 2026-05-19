const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('Authorization');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token (Bearer <token>)
    const extractedToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    
    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET || 'secret');
    req.user = decoded; // { id, username }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
