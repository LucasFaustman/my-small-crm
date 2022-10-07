const User = require('../Models/user')
const Task = require('../Models/task')
const Deal = require('../Models/deals')
const { checkUser } = require("../middlewar/authMiddleware");
const authController = require('./authController');
const user = require('../Models/user');
const mongoose = require('mongoose');
const {crm_lead} = require('../Models/crm');
const { vary } = require('express/lib/response');

//create task
module.exports.addTaskItem_post = async (req,res) => {
const userID = res.locals.user.id

const leadData = await crm_lead.findOne({owner: [userID], name: req.body.clientNameFieldVal})

if (!leadData) {
    console.log('User not found.')
} 

const taskData = await Task.create({
    tasksTitleFieldVal: req.body.tasksTitleFieldVal,
    clientNameFieldVal: req.body.clientNameFieldVal,
    dateDueFieldVal: req.body.dateDueFieldVal,
    statusFieldVal: req.body.statusFieldVal,
    priorityFieldVal: req.body.priorityFieldVal,
    leadOwner: leadData,
    owner: userID
})

await crm_lead.updateOne({
    owner:[userID],
    name:  req.body.clientNameFieldVal
}, {
    $push: {tasks: taskData._id}
})

res.send('Task added')
}

module.exports.getTaskItems_get =  async (req,res) => {

//sorting

//the actual column we are sorting(ex. due date)
let thingToSort = req.params.sort.split(' ')[0]

//either ascending or descending
let sortOrder = req.params.sort.split(' ')[1]

//make asc or desc into a numeric value that we can sort with
let sortOrderInNumerics = sortOrder === 'asc' ? 1 : -1

//pagination

var perPage = 8;

var page = req.params.page || 1


//get user id

const userID = res.locals.user.id

const userEmail = res.locals.user.email


const userData = await User.findOne({email: userEmail})

var total = await Task.countDocuments({owner:[userData._id]}); 

var pages = Math.ceil(total / perPage);

const leadData = await crm_lead.findOne({owner: [userID]})

    try {


        const allTaskItems = await Task.find({ owner:[userData._id]})

    const taskItems = await Task.find({ owner:[userData._id], statusFieldVal: {$nin: ['Completed']}}).skip((perPage * page) - perPage).limit(perPage).sort({ [thingToSort]: sortOrderInNumerics })


    const leadItems = await crm_lead.find({ owner:[userData._id]})

    //render tasks.ejs with the tasks of the user, as well as the title, page title, and folder for the views. and the numbers of pages we have, and our current page for pagination

        
    res.render('tasks.ejs', {tasks: taskItems , allTasks: allTaskItems, sortOrder: sortOrder, thingToSort: thingToSort, current: page,  pages: pages, leads: leadItems, title: 'Tasks List', page_title: 'Upcoming Tasks', folder: 'Tasks'}
    )
    
    }
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
        const allTaskItems = await Task.find({ owner:[userData._id]})

        //declare variable named dealItems that finds deals with the owner of userData._id

        const dealItems = await Deal.find({ owner:[userData._id]})


        //declare a variable named taskItems that await to find tasks in the database with an owner of the users id

    const taskItems = await Task.find({ owner:[userData._id]}).sort({ dateDueFieldVal: 1 })

    //render tasks.ejs with the tasks of the user, as well as the title, page title, and folder for the index views
        
    res.render('index.ejs', {tasks: taskItems , allTasks: allTaskItems, deals: dealItems, title: 'Dashboard', page_title: 'Dashboard', folder: 'Dashboards'}
    )
    
    }
//if any errors, console log them
    catch(err) {
        console.log(err)
    }
}

    
//get completed tasks

module.exports.getCompletedTaskItems_get =  async (req,res) => {

    //sorting
    
    console.log(req.params.sort)
    
    //the actual column we are sorting(ex. due date)
    let thingToSort = req.params.sort.split(' ')[0]
    
    //either ascending or descending
    let sortOrder = req.params.sort.split(' ')[1]
    
    //make asc or desc into a numeric value that we can sort with
    let sortOrderInNumerics = sortOrder === 'asc' ? 1 : -1
    
    
    
    
    //pagination
    
    var perPage = 8;
    
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
        
        const taskItems = await Task.find({ owner:[userData._id], statusFieldVal:'Completed'}).skip((perPage * page) - perPage).limit(perPage).sort({ [thingToSort]: sortOrderInNumerics })
    
        const leadItems = await crm_lead.find({ owner:[userData._id]})    
            
        res.render('completedtasks.ejs', {tasks: taskItems , allTasks: allTaskItems, sortOrder: sortOrder, thingToSort: thingToSort, current: page,  pages: pages, leads: leadItems, title: 'Completed Tasks', page_title: 'Completed Tasks', folder: 'Tasks'}
        )
        
        }
        catch(err) {
            console.log(err)
        }
    
    }
    
    
    