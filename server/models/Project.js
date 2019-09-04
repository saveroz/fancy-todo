const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({

    name : {
        type :String,
        required : true
    } ,
    members : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    Owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},{
    timestamps : true,
    versionKey :false
})

const Project = mongoose.model("Project", ProjectSchema)

module.exports = Project
