import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const verifyAdminToken = (req, res, next) => {
  const token = req.cookies.AdminToken; 

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    console.log(err);
    
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
