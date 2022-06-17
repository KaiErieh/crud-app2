const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const uuid = require('uuid')

const loginUser = asyncHandler(async (req, res) => {

  const user = await User.find()
  res.status(200).json(user)

})

const registerUser = asyncHandler(async (req, res) => {

  const {username, password} = req.body
  if(!username || !password) {
    res.status(400).json({message: "Please fill all fields"})
  }

  const userExists = await User.findOne({username})
  if(userExists){
    res.status(400)
   throw new Error("User already exists!")
  } 

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)


  const registeredUser = await User.create({
    username,
    password: hashedPassword,
    
  })

  res.status(201).json({username: username, token: generateToken(registerUser.id)})
})

const deleteUser = asyncHandler(async(req, res) => {

  const user = await User.findById(req.params.id)
  if(user){
    await User.remove(user)
    res.status(200).json(`Removed user ${user.username}`)
  } else {
    res.status(400).json('User not found')
  }

})

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}


module.exports = { loginUser, registerUser, deleteUser }