const express = require('express')
const router = express.Router()
const ProjectController = require('../controllers/ProjectController')
const authentication = require('../middleware/authentication')
const {projectOwnerAuthorization} = require('../middleware/authorization')



router.use(authentication)
router.get('/', ProjectController.getAll)
router.get('/:id', ProjectController.getOne)
router.post('/', ProjectController.create)
router.delete('/:id',projectOwnerAuthorization, ProjectController.delete)
router.patch('/:id',projectOwnerAuthorization,  ProjectController.update)
router.post('/:id/addMember',projectOwnerAuthorization, ProjectController.addMember)
router.post('/:id/removeMember',projectOwnerAuthorization, ProjectController.removeMember)




module.exports = router
