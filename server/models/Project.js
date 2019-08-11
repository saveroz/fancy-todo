const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({

    name : String,
    members : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    todos : [{
        type : Schema.Types.ObjectId,
        ref : "Todo"
    }]
},{
    timestamps : true,
    versionKey :false
})

const Project = mongoose.model("Project", ProjectSchema)

module.exports = Project