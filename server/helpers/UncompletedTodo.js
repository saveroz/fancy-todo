const Todo = require('../models/Todo')
const CronJob = require("cron").CronJob
const moment = require('moment')

function sendUncompletedTodo(req, res , next){
    console.log("masuk ke uncompleted todo")

    let users = []
    Todo.find({
        status : false,
        ProjectId : null
    })
    .populate({
        path : "UserId",
        select : "_id username email"
    })
    .then(alltodo=>{

        // res.status(200).json(alltodo)
        for(let todo of alltodo){
            let userid = todo.UserId._id
            if(!users.includes(userid)){
                users.push(todo.UserId)
            }
        }
        // console.log(users)
        res.status(200).json(users)
    })
    .catch(next)
    
    // new CronJob(' 0 8 * * 1', function() {

    //     Todo.find({status:false,ProjectId: null})
    //     .then(alltodo=>{


    //         // if (moment(this.in_date)>moment(this.due_date)){
    //         //     let diff = Math.ceil((moment(this.in_date)-moment(this.due_date))/86400000)
    //         //     this.fine = diff * 1000
    //         // }
    //         // else{
    //         //     this.fine = 0
    //         // }
    //         // next()





    //     })
       
    // }, null, true, 'Asia/Jakarta');

}
// console.log(moment(new Date()-)
module.exports = sendUncompletedTodo
