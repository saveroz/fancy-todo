const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require("moment")

const TodoSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    } ,
    status : Boolean,
    duedate: {
        type : Date,
        min : [new Date().toLocaleDateString(), "Minimum due date is today"],
        required : true
    },
    UserId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    ProjectId : {
        type : Schema.Types.ObjectId,
        ref : "Project"
    }  
},{
    timestamps : true,
    versionKey :false
})




TodoSchema.pre('save', function(next){
    if (!this.ProjectId){
        this.ProjectId = null
    }
    let status = false
    this.status = status
    next()
})

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo
