const User = require('../Models/user')
const Task = require('../Models/task')
const { checkUser } = require("../middlewar/authMiddleware");
const authController = require('./authController');
const user = require('../Models/user');
const jwt = require('jsonwebtoken');



module.exports.addTaskItem_post = async (req,res) => {


    // const { tasksTitleField,
    //     clientNameField,
    //     dateDueField,
    //     priorityField,
    //     statusField,
    //  } = req.body


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

module.exports.getTaskItems_get = (req,res) => {
    res.render('/tasks')
}


