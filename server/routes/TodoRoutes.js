const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/TodoController')
const authentication = require('../middleware/authentication')
const {authorizationTodo} = require('../middleware/authorization')


router.use(authentication)

router.get('/', TodoController.getAll)
router.get('/projects/:id', TodoController.getByProject)
router.get('/:id',  TodoController.getOne)
router.post('/', TodoController.create)
router.patch('/:id',  authorizationTodo, TodoController.update)
router.delete('/:id', authorizationTodo, TodoController.delete)

module.exports = router
