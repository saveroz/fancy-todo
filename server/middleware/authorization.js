const Todo = require('../models/Todo')
const Project = require('../models/Project')


function authorizationTodo(req,res,next){
    
    console.log("masuk ke authorization")
    let id = req.params.id
    let UserId = req.decode.id

    Todo.findById(id)
    .then(theTodo=>{

        if (!theTodo){
            next({status:404, message : "todo not found"})
        }
        else{
            if(theTodo.ProjectId){
                let ProjectId = theTodo.ProjectId
                Project.findById(ProjectId)
                .then(theProject=>{
                    
                    if(!theProject){
                        next({status:404, message: "project not found"})
                    }
                    else{
                        
                        if (theProject.members.includes(UserId)){
                            next()
                        }
                        else{
                            next({status:401, message : "You are not authorized"})
                        }
                    }
                })
            }
            else{

                if (!theTodo){
                    next({status:404, message: "todo not found"})
                }
                else if(theTodo.UserId==UserId){
                    next()
                }
                else{
                    next({status:401, message : "you are not authorized"})
                }
            }
        }
    })
}


function projectOwnerAuthorization(req,res,next){
    
    
    let ProjectId = req.params.id
    let Owner = req.decode.id
    
    Project.findById(ProjectId)
    .then(theproject=>{
        if (!theproject){
            next({status:404, message : "Project not found"})
        }
        else {

            if (theproject.Owner==Owner){
                console.log(theproject.Owner)
                console.log(theproject.Owner)
                next()
            }
            else{
                // console.log(typeof theproject.Owner ,"project owner")
                // console.log(typeof Owner ,"owner")
                next({status : 401, message:"You are not authorized"})
            }
        }
    })
    .catch(next)
}

module.exports = {authorizationTodo, projectOwnerAuthorization}
