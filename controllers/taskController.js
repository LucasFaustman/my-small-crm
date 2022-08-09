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
console.log(taskData._id)
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

    const taskItems = await Task.find({ owner:[userData._id]}).sort({ dateDueFieldVal: 1 })

    //render tasks.ejs with the tasks of the user, as well as the title, page title, and folder for the views
        
    res.render('tasks.ejs', {tasks: taskItems , title: 'Tasks List', page_title: 'Upcoming Tasks', folder: 'Tasks'}
    )
    
    }
//if any errors, console log them
    catch(err) {
        console.log(err)
    }

}





module.exports.deleteTaskItem_delete = async (req,res) => {
    //delete request!

        //get user email
const userEmail = res.locals.user.email

//find user by email

const userData = await User.findOne({email: userEmail})

    //lets do a try

    //get the id
    let id = req.body.id

    //use a try
    try {
        //find oneanddelete from our id
        await Task.findOneAndDelete({  _id : id })
        //find one in our user database and update the deleted task count to one more
        await User.findOneAndUpdate({deletedTaskCount: deletedTaskCount++})
        //send back that the task was deleted
        res.send('Task deleted')
    }

    catch (err) {
        console.log(err)
    }



}


//edit task route

module.exports.editTaskItem_put = async (req,res) => {

//get id 
let id = req.body.id

//use a try catch

try {
    await Task.findOneAndUpdate({_id: id}, {$set:{ //find one task and update. find one with the id of the one inside the ejs
    tasksTitleFieldVal: req.body.tasksTitleFieldVal, //replace with all values inputted into the form
    clientNameFieldVal: req.body.clientNameFieldVal,
    dateDueFieldVal: req.body.dateDueFieldVal,
    statusFieldVal: req.body.statusFieldVal,
    priorityFieldVal: req.body.priorityFieldVal}});
//send back that the task was edited
    res.send('task edited')
} catch (err) {
    console.log(err)
}
}


// show tasks for index crm dashboard

module.exports.showTasksInDashboard  = async(req,res) => {

      //get user email
const userEmail = res.locals.user.email

//find user by email

const userData = await User.findOne({email: userEmail})

    try {

        //declare a variable named taskItems that await to find tasks in the database with an owner of the users id

    const taskItems = await Task.find({ owner:[userData._id]}).sort({ dateDueFieldVal: 1 })

    //render tasks.ejs with the tasks of the user, as well as the title, page title, and folder for the index views
        
    res.render('index.ejs', {tasks: taskItems , title: 'Dashboard', page_title: 'Dashboard', folder: 'Dashboards'}
    )
    
    }
//if any errors, console log them
    catch(err) {
        console.log(err)
    }
}

    
