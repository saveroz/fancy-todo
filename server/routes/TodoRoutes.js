const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/TodoController')
const authentication = require('../middleware/authentication')

router.get('/', authentication, TodoController.getAll)
router.get('/:id', authentication, TodoController.getOne)
router.post('/create', authentication, TodoController.create)
router.patch('/', authentication, TodoController.update)
router.delete('/', authentication , TodoController.delete)

module.exports = router