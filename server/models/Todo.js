const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TodoSchema = new Schema({
    name : String,
    description : String,
    status : String,
    duedate: Date,
    UserId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }  
},{
    timestamps : true,
    versionKey :false
})
TodoSchema.pre('save', function(next){
    let status = "uncompleted"
    this.status = status
    next()
})

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo