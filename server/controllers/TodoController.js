const Todo = require('../models/Todo')
const Project = require('../models/Project')

class TodoController {

    static getAll(req, res, next) {

        let UserId = req.decode.id

        Todo.find({ UserId, ProjectId: null })
            .then(alltodo => {
                // console.log(alltodo)
                res.status(200).json(alltodo)
            })
            .catch(next)

    }

    static getByProject(req, res, next) {

        let ProjectId = req.params.id
        // console.log("masuk ke todo projects", ProjectId)
        Todo.find({
            ProjectId
        }).populate({
            path: "UserId",
            select: "_id username email"
        })
            .then(alltodo => {
                res.status(200).json(alltodo)
            })
            .catch(next)

    }

    static getOne(req, res, next) {

        let id = req.params.id
        // console.log("masuk ke get One")
        Todo.findById(id)
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static create(req, res, next) {

        const { name, description, duedate, ProjectId } = req.body
        let UserId = req.decode.id

        //    console.log("aneh")
        Todo.create({ name, ProjectId, description, duedate, UserId })
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)

    }

    static update(req, res, next) {

        let id = req.params.id

        let updatedData = {}

        req.body.name && (updatedData.name = req.body.name)
        req.body.description && (updatedData.description = req.body.description)
        req.body.duedate && (updatedData.duedate = req.body.duedate)
        req.body.status && (updatedData.status = req.body.status)
        req.body.UserId && (updatedData.UserId = req.body.UserId)

        // console.log(updatedData)
        Todo.findByIdAndUpdate(id, updatedData, { new: true })
            .then(updatedData => {
                res.status(200).json(updatedData)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        let id = req.params.id
        // let id = req.body.id

        Todo.findOneAndRemove({
            _id: id
        })
            .then(success => {
                res.status(200).json(success)
            })
            .catch(next)
    }

}

module.exports = TodoController
