const Project = require('../models/Project')
const User = require('../models/User')

class ProjectController{

    static create(req, res, next){

        const { name, members, todos } = req.body

        Project.create({name,members, todos})
        .then(success=>{
            res.status(201).json(success)
        })
        .catch(next)

    }

    static getOne(req,res,next){

        let id = req.params.id

        Project.findById(id)
        .then(theproject=>{
            res.status(200).json(theproject)
        })
        .catch(next)

    }

    static getAll(req, res, next){

        let userId = req.params.id
        let userProjects = []
        Project.find().populate('members')
        .then(allproject=>{

            for (let project of allproject){

                for(let member of project.members){
                    if (member === userId){
                        userProjects.push(project)
                        break
                    }
                }
            }
            res.status(200).json(allproject)
        })
        .catch(next)
    }

    static update(req,res,next){

        let id = req.params.id

        let updatedData = {}

        req.body.name && (updatedData.name = req.body.name)
        req.body.member && (updatedData.members = req.body.members)
        req.body.todos && (updatedData.todos = req.body.todos)

        Project.findByIdAndUpdate(id ,updatedData, {new: true})
        .then(updatedproject=>{
            res.status(200).json(updatedproject)
        })
        .catch(next)
        
    }

    static delete(req, res, next){

        let id = req.params.id
        
        Project.findByIdAndDelete(id)
        .then(success=>{
            res.status(200).json(success)
        })
        .catch(next)
    }



}

module.exports = ProjectController