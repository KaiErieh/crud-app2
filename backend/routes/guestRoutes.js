const express = require('express')
const {
        createGuest,
        loginGuest,
        getGuests

} = require('../controllers/guestController')

const router = express.Router()

router.post('/', createGuest)
router.post('/login', loginGuest)
router.get("/", getGuests)


module.exports = router