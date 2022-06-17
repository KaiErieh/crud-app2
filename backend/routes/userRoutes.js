const express = require('express')
const { loginUser,
        registerUser,
        deleteUser,
       } = require('../controllers/userController')

const router = express.Router()

router.get('/', loginUser)
router.post('/', registerUser)
router.put('/:id')
router.delete('/:id', deleteUser)

module.exports = router
