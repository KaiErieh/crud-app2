const express = require('express')
const { loginUser,
       registerUser,
       deleteUser,
       getMe,
       getUsers,
} = require('../controllers/userController')

const router = express.Router()

router.get('/login', loginUser)
router.post('/', registerUser)
router.put('/:id')
router.delete('/:id', deleteUser)
router.get("/:id", getMe)
router.get("/", getUsers)

module.exports = router
