const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { generatePass } = require('../helpers/encryptPass')

const UserSchema = new Schema({
    username : String,
    email : {
        type :String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        validate : {
            validator : function(){
                return new Promise((resolve,reject)=>{
                    User.findOne({
                        email : this.email
                    })
                    .then(email=>{
                        if (email){
                            resolve(false)
                        }
                        else{
                            resolve(true)
                        }
                    })
                    .catch(err =>{
                        resolve(false)
                    })
                })
            }, message : "this email has been used"
        }
    },
    password : String
},{
    timestamps : true,
    versionKey :false
})

UserSchema.pre('save', function(next){
    let password = generatePass (this.password)
    this.password = password
    next()
})
const User = mongoose.model("User", UserSchema)

module.exports = User