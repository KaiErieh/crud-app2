const express = require('express')
const { 
        createGuest,
        loginGuest,
       } = require('../controllers/guestController')

const router = express.Router()

router.post('/', createGuest)
router.post('/login', loginGuest)


module.exports = router