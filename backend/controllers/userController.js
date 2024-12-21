import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const createUser = asyncHandler(async (req,res) => {
  const {username, email,password} = req.body

});

export { createUser };
