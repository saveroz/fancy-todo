const mongoose = require('mongoose')
const Schema = mongoose.Schema


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
