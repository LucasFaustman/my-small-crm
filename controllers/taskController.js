const User = require('../Models/user')
const Task = require('../Models/task')
const { checkUser } = require("../middlewar/authMiddleware");
const authController = require('./authController');
const user = require('../Models/user');
const mongoose = require('mongoose');



module.exports.addTaskItem_post = async (req,res) => {

//create task

//get user email
const userEmail = res.locals.user.email

//find user by email

const userData = await User.findOne({email: userEmail})

//add check if there is user, go to next. if not, console.log error
if (!userData) {
    console.log('User not found.')
} 
//now we want to create the task by extracting the task payload, or each element of our task form.

const taskData = await Task.create({
    tasksTitleFieldVal: req.body.tasksTitleFieldVal,
    clientNameFieldVal: req.body.clientNameFieldVal,
    dateDueFieldVal: req.body.dateDueFieldVal,
    statusFieldVal: req.body.statusFieldVal,
    priorityFieldVal: req.body.priorityFieldVal,
    owner: userData._id
})

//now push task id to the user

await User.updateOne({
    email: userEmail
}, {
    $push: {tasks: taskData._id}
})

// console.log(userEmail, req.body.tasksTitleFieldVal)


res.send('Task added')
}


//get the tasks page, and also the tasks assigned to the user

module.exports.getTaskItems_get =  async (req,res) => {

    //get user email
const userEmail = res.locals.user.email

//find user by email

const userData = await User.findOne({email: userEmail})

    try {

        //declare a variable named taskItems that await to find tasks in the database with an owner of the users id

    const taskItems = await Task.find({ owner:[userData._id] })

    //render tasks.ejs with the tasks of the user
        
    res.render('tasks.ejs', {tasks: taskItems , title: 'Tasks List', page_title: 'Tasks List', folder: 'Tasks'}
    )
    }

    catch(err) {
        console.log(err)
    }


    //get tasks from

}

module.exports.deleteTaskItem_delete = async (req,res) => {
    res.send('Task deleted')
}

