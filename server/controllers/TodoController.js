const Todo = require('../models/Todo')

class TodoController{

    static getAll(req, res, next){
        
        let UserId = req.decode.id
       
        Todo.find({UserId})
        .then (alltodo=>{
            // console.log(alltodo)
            res.status(200).json(alltodo)
        })
        .catch(next)

    }

    static getOne(req, res, next){

        let id = req.query.id

        Todo.findById(id)
        .then(todo=>{
            res.status(200).json(todo)
        })
        .catch(next)
    }

    static create(req, res, next){

        const {name, description, duedate, status} = req.body

        if (!name || !description || !duedate){
            console.log("masuk ke error")
            throw new Error("incomplete data")
        }

        let UserId = req.decode.id
        
       console.log("aneh")
        Todo.create({name, description, duedate, status, UserId})
        .then(success=>{
            res.status(201).json(success)
        })
        .catch(next)

    }

    static update(req, res, next){

        let id = req.body.id

        let updatedData = {}

        req.body.name && (updatedData.name = req.body.name)
        req.body.description && (updatedData.description = req.body.description)
        req.body.duedate && (updatedData.duedate = req.body.duedate)
        req.body.status && (updatedData.status = req.body.status)
        req.body.UserId && (updatedData.UserId = req.body.UserId)

        console.log(updatedData)
        Todo.findByIdAndUpdate(id, updatedData, {new:true})
        .then( updatedData =>{
            res.status(200).json(updatedData)
        })
        .catch(next)
    }

    static delete(req, res, next){
        // let id = req.params.id
        let id = req.body.id

        Todo.deleteOne({
            _id : id
        })
        .then(success=>{
            res.status(200).json(success)
        })
        .catch(next)
    }

}

module.exports = TodoController