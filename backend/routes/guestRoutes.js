const express = require('express')
const {
        createGuest,
        loginGuest,
        getGuests,
        deleteGuest

} = require('../controllers/guestController')

const router = express.Router()

router.post('/', createGuest)
router.post('/login', loginGuest)
router.get("/", getGuests)
router.delete("/:id", deleteGuest)


module.exports = router