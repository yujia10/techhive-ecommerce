import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js';

const authenticate = asyncHandler(async (req, res,next) => {
  let token;

  // Read jwt from the 'jwt' cookie
  token = req.cookies.jwt

  if (token) {
    try {
      // Verify is jwt is valid
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Use decoded userId to find user but exclude password
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401)
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401)
    throw new Error("Not authorized, token failed.");
  }
});

// Check admin status
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

export {authenticate, authorizeAdmin}
