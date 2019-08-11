const jwt = require('jsonwebtoken')
const Secret="IronThrone"
const User = require('../models/User')
function authentication(req,res,next){

    
    try {
        
        const token = req.headers.token
       
        const decode = jwt.verify(token, Secret)
        
        req.decode = decode
        let id = req.decode.id
        

        User.findById(id)
        .then(user=>{
            
            if(user){
                next()
            }
            else{
                res.status(401).json({
                    message : 'You are not authenticated Users'
                })
            }
        })
        
    }
    catch{
        // console.log(req.headers.token)
        res.status(401).json({
            message: 'You are not authenticated User'
        })
       
    }
}

module.exports = authentication