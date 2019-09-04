const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/TodoController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)

router.get('/', TodoController.getAll)
router.get('/projects/:id', TodoController.getByProject)
router.get('/:id',  TodoController.getOne)
router.post('/',  TodoController.create)
router.patch('/:id',  authorization, TodoController.update)
router.delete('/:id', authorization, TodoController.delete)

module.exports = router
