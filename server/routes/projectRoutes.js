const express = require('express')
const router = express.Router()
const ProjectController = require('../controllers/ProjectController')


router.get('/', ProjectController.getAll)
router.get('/:id', ProjectController.getOne)
router.post('/create', ProjectController.create)
router.delete('/:id', ProjectController.delete)
router.patch('/:id', ProjectController.update)



module.exports = router