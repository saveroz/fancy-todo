const express = require('express')
const router = express.Router()
const ProjectController = require('../controllers/ProjectController')
const authentication = require('../middleware/authentication')

router.use(authentication)
router.get('/', ProjectController.getAll)
router.get('/:id', ProjectController.getOne)
router.post('/', ProjectController.create)
router.delete('/:id', ProjectController.delete)
router.patch('/:id', ProjectController.update)
router.post('/:id/addMember', ProjectController.addMember)
router.post('/:id/removeMember', ProjectController.removeMember)




module.exports = router
