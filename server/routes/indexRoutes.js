const express = require('express')
const router = express.Router()
const userRoutes = require('./UserRoutes')
const TodoRoutes = require('./TodoRoutes')
const projectRoutes = require('./projectRoutes')

router.get('/', function(req,res){
    res.send('homepage')
})

router.use('/users', userRoutes)

router.use('/todo',TodoRoutes)
router.use('/projects', projectRoutes)




module.exports = router