import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authenticationToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)
    return res.status(401).json({
      message: 'No token',
    });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res.status(401).json({ message: 'Token is invalid or expired' });
    req.user = user;
    next();
  });
};

export default authenticationToken;
