const Project = require('../models/Project')
const Todo = require('../models/Todo')
// const User = require('../models/User')

class ProjectController {

    static create(req, res, next) {

        let Owner = req.decode.id
        const { name } = req.body
        const members = Owner
        Project.create({ name, members, Owner })
            .then(success => {
                res.status(201).json(success)
            })
            .catch(next)

    }

    static getOne(req, res, next) {

        let id = req.params.id
        // console.log("masuk ke get one", id)
        Project.findById(id).populate("members")
            .then(theproject => {
                res.status(200).json(theproject)
            })
            .catch(next)

    }

    static getAll(req, res, next) {
        // console.log("masuk ke get all")
        let UserId = req.decode.id
        let userProjects = []
        Project.find().populate("members")
            .then(allproject => {
                // console.log(allproject)
                for (let project of allproject) {

                    let members = project.members

                    for (let member of members) {

                        if (member.id == UserId) {
                            userProjects.push(project)
                        }
                    }

                }
                res.status(200).json(userProjects)
            })
            .catch(next)
    }

    static update(req, res, next) {

        let id = req.params.id

        let updatedData = {}

        req.body.name && (updatedData.name = req.body.name)
        req.body.member && (updatedData.members = req.body.members)
      

        Project.findByIdAndUpdate(id, updatedData, { new: true })
            .then(updatedproject => {
                res.status(200).json(updatedproject)
            })
            .catch(next)

    }

    static delete(req, res, next) {

        let id = req.params.id

        Project.findById(id)
            .then(project => {

                if (!project) {
                    next({ status: 404, message: "project not found" })
                }
                else {

                    return Project.findByIdAndDelete(id)

                }
            })
            .then(result=>{
                // console.log(result, "delete project")
                return Todo.deleteMany({ProjectId:id})
            })
            .then(result => {
                // console.log(result ,"delete todo")
                res.status(200).json({ message: "delete successfully" })
            })
            .catch(next)

       
    }

    static addMember(req, res, next) {

        let projectId = req.params.id
        let membersId = req.body.membersId
        // console.log("masuk ke add member")
        // console.log(req.body.membersId)
       
        Project.findById(projectId)
            .then(project => {
                
                for (let memberId of membersId){
                    if(!project.members.includes(memberId)){
                        console.log("masuk ke add member controller")
                        project.members.push(memberId)
                        project.save()
                    }
                }
                res.status(200).json(project)
            })
            .catch(err => {
                next({ status: 404, message: "error when add members" })
            })
    }

    static removeMember(req, res, next) {

        let projectId = req.params.id
        let memberId = req.body.memberId
        // console.log(memberId)
        // console.log("masuk ke remove member")

        Project.findById(projectId)
            .then(project => {
                project.members.pull(memberId)
                project.save()
                res.status(200).json(project)
            })
            .catch(next)
    }

    static addTodo(req, res, next) {

        let projectId = req.params.id
        let TodoId = req.body.TodoId

        Project.findById(projectId)
            .then(project => {
                project.push(TodoId)
                project.save()
                res.status(200).json(project)
            })
            .catch(next)


    }

    static removeTodo(req, res, next) {

        let projectId = req.params.id
        let TodoId = req.body.TodoId

        Project.findById(projectId)
            .then(project => {
                project.pull(TodoId)
                project.save()
                res.status(200).json(project)
            })
            .catch(next)
    }

}

module.exports = ProjectController
