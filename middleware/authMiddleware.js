const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = bearerToken?.split(' ')?.[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
