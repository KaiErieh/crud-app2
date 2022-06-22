const uuid = require('uuid')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")
const Guest = require('../models/guestModel')
const userModel = require('../models/userModel')


const createGuest = asyncHandler(async (req, res) => {
  const { name, email, startDate } = req.body
  if (!email) {
    res.status(400)
    throw new Error('Fill all required fields')
  }

  const guestExists = await Guest.findOne({ email })



  if (guestExists) {
    res.status(400)
    throw new Error('Guest already exists!')
  }

  const guest = await Guest.create({
    name,
    email,
    startDate,
    code: uuid.v1(),
  })

  res.status(201).json(`Created guest ${guest.email} with code ${guest.code}`)
})

const loginGuest = asyncHandler(async (req, res) => {

  const { code } = req.body



  console.log("guestController.js: " + req.body)

  if (!code) {
    res.status(400)
    throw new Error(`Please, enter your code`)
  }

  const guest = await Guest.findOne({ code })

  if (guest) {
    res.json({
      email: guest.email,
      token: generateToken(guest.id)
    })
  } else {
    res.status(400)
    throw new Error(`Code invalid`)
  }


})

const getGuests = asyncHandler(async (req, res) => {
  const guests = await Guest.find()

  if (guests) {
    res.status(200).json(guests)
  } else {
    res.status(404)
    throw new Error("No users found")
  }
})

const deleteGuest = asyncHandler(async (req, res) => {
  const guest = await Guest.findById(req.params.id)
  if (guest) {
    res.status(200)
    res.json(guest)
  } else {
    res.status(404)
    throw new Error("Guest not found")
  }
  await Guest.remove(guest)

})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}


module.exports = { createGuest, loginGuest, getGuests, deleteGuest }