const uuid = require('uuid')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const Guest = require('../models/guestModel')


const createGuest = asyncHandler(async(req, res) => {
  const { email } = req.body
  if(!email){
    res.status(400)
    throw new Error('Fill all required fields')
  }
  
  const guestExists = await Guest.findOne({email})

  

  if(guestExists){
    res.status(400)
    throw new Error('Guest already exists!')
  }

  const guest = await Guest.create({
    email,
    code: uuid.v1(),
  })

  res.status(201).json(`Created guest ${guest.email}`)
})

const loginGuest = asyncHandler(async(req, res) => {
  const { code } = req.body
  const guest = await Guest.findOne({code})

  if(guest){
    res.json({
      email: guest.email
    })
  }


})

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}


module.exports = { createGuest, loginGuest }