require("dotenv").config();
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const Secret=process.env.SECRET
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const jwt = require('jsonwebtoken')
const {checkPassword} = require('../helpers/encryptPass')

class UserController{


    static create(req, res, next){

        
        
        const {username ,email, password} = req.body
        


        // console.log("tetap berhasil")
        console.log(username)
        
        User.create({username, email, password})
        .then(success=>{
            res.status(201).json("your account register successfully")
        })
        .catch(next)

    }

    static signIn(req, res, next){

        // console.log(req.body.idToken)
       
        client.verifyIdToken({
            idToken : req.body.idToken,
            audience : GOOGLE_CLIENT_ID
        })
        .then( function (ticket){
            // console.log(ticket.getPayload())
            const {email, name} = ticket.getPayload()
            
        User.findOne( {email})
        .then(user =>{
            if(!user){
                return User.create({
                    'username' : name,
                    'email' : email,
                    'password' : "tameImpala"
                })
            }
            else{
                return user
            }
        })
        .then( user=> {
            let userdata = {
                'username' : user.username,
                'id' : user.id,
                'email' : user.email
            }
            let token = jwt.sign(userdata,Secret)
            res.json(token)       
        })
        .catch(next)
        
    }).catch(next)

    }

    static login(req, res, next){

        const {email, password} = req.body
        // console.log(email,password)
    
        User.findOne({email})
        .then(user=>{

            if (!user){
                throw new Error ('email/password not found')
            }

            else if (checkPassword(password,user.password)){
                let userdata = {
                    'username' : user.username,
                    'id' : user.id,
                    'email' : user.email
                }
                let token = jwt.sign(userdata,Secret)
                res.status(200).json(token)       
                // res.status(200).json("you have success to login")
            }
            else{
                // res.status(200).json("you have failed to login")
                throw new Error ('email/password not found')
            }
            
        })
        .catch(next)
        



    }
}

module.exports = UserController