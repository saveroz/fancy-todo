const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/signIn', UserController.signIn)

router.post('/login', UserController.login)

router.post('/register', UserController.create)


module.exports = router