const User = require('../Models/user')
const Task = require('../Models/task')
const Deal = require('../Models/deals')
const { checkUser } = require("../middlewar/authMiddleware");
const authController = require('./authController');
const user = require('../Models/user');
const mongoose = require('mongoose');
const {crm_lead} = require('../Models/crm');
const { vary } = require('express/lib/response');


module.exports.addTaskItem_post = async (req,res) => {

//create task

//get user id
const userID = res.locals.user.id

console.log(req.body.dateDueFieldVal)

//find lead by id

const leadData = await crm_lead.findOne({owner: [userID], name: req.body.clientNameFieldVal})

//add check if there is user, go to next. if not, console.log error
if (!leadData) {
    console.log('User not found.')
} 
//now we want to create the task by extracting the task payload, or each element of our task form.

const taskData = await Task.create({
    tasksTitleFieldVal: req.body.tasksTitleFieldVal,
    clientNameFieldVal: req.body.clientNameFieldVal,
    dateDueFieldVal: req.body.dateDueFieldVal,
    statusFieldVal: req.body.statusFieldVal,
    priorityFieldVal: req.body.priorityFieldVal,
    leadOwner: leadData,
    owner: userID
})

//now push task id to the lead

await crm_lead.updateOne({
    owner:[userID],
    name:  req.body.clientNameFieldVal
}, {
    $push: {tasks: taskData._id}
})

// console.log(userEmail, req.body.tasksTitleFieldVal)
res.send('Task added')
}




//get the tasks page, and also the tasks assigned to the user

module.exports.getTaskItems_get =  async (req,res) => {

//pagination

var perPage = 9;

var page = req.params.page || 1





//get user id

const userID = res.locals.user.id


    //get user email
const userEmail = res.locals.user.email

//find user by email for leads

const userData = await User.findOne({email: userEmail})

// total number of records from database for pagination 

var total = await Task.countDocuments({owner:[userData._id]}); 



// Calculating number of pagination links required
var pages = Math.ceil(total / perPage);


//find lead by id for tasks

const leadData = await crm_lead.findOne({owner: [userID]})



    try {


        const allTaskItems = await Task.find({ owner:[userData._id]})


        //declare a variable named taskItems that await to find tasks in the database with an owner of the users id. also will skip anything after our page, and limit it to 9 a page

    const taskItems = await Task.find({ owner:[userData._id]}).skip((perPage * page) - perPage).limit(perPage)


    const leadItems = await crm_lead.find({ owner:[userData._id]})

    //render tasks.ejs with the tasks of the user, as well as the title, page title, and folder for the views. and the numbers of pages we have, and our current page for pagination

        
    res.render('tasks.ejs', {tasks: taskItems , allTasks: allTaskItems, current: page,  pages: pages, leads: leadItems, title: 'Tasks List', page_title: 'Upcoming Tasks', folder: 'Tasks'}
    )
    
    }
//if any errors, console log them
    catch(err) {
        console.log(err)
    }

}





module.exports.deleteTaskItem_delete = async (req,res) => {
    //delete request!

    console.log(req.body.id)
        //get task id
const taskID = req.body.id




    //use a try
    try {
        //find oneanddelete from our id
        await Task.findOneAndDelete({  _id : taskID })
        //send back that the task was deleted
        res.send('Task deleted')
    }

    catch (err) {
        console.log(err)
    }

}


//edit task route

module.exports.editTaskItem_put = async (req,res) => {

    console.log(req.body)
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


// show tasks for index crm dashboard AND deals!!!

module.exports.showTasksInDashboard  = async(req,res) => {

      //get user email
const userEmail = res.locals.user.email

//find user by email

const userData = await User.findOne({email: userEmail})

    try {

        //declare variable named dealItems that finds deals with the owner of userData._id

        const dealItems = await Deal.find({ owner:[userData._id]})


        //declare a variable named taskItems that await to find tasks in the database with an owner of the users id

    const taskItems = await Task.find({ owner:[userData._id]}).sort({ dateDueFieldVal: 1 })

    //render tasks.ejs with the tasks of the user, as well as the title, page title, and folder for the index views
        
    res.render('index.ejs', {tasks: taskItems , deals: dealItems, title: 'Dashboard', page_title: 'Dashboard', folder: 'Dashboards'}
    )
    
    }
//if any errors, console log them
    catch(err) {
        console.log(err)
    }
}

    
