const Todo = require('../models/Todo')


function authorization(req,res,next){
    
    console.log('authorization')
    let id = req.body.id
    // console.log(id)
    Todo.findOne({
        '_id':id,
        'UserId': req.decode.id 
    })
    .then(Todo=>{
        // console.log(Todo)
        if (!Todo){
            console.log('masuk ke null')
            res.status(401).json(`${req.decode.username} not authorized please check carefully`)
        }
        else{
            next()
        }
        
    })
    .catch(err=>{
        console.log("masuk ke catch")
        res.status(500).json(err)
    })
}

module.exports = authorization
