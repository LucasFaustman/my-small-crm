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

try{
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
res.status(200).json({ message:'Task Added' });
}

catch(err) {
    return res.status(400).json({ error:'Server error.' });
}

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
        
    res.render('tasks.ejs', {tasks: taskItems , allTasks: allTaskItems, sortOrder: sortOrder, thingToSort: thingToSort, current: page,  pages: pages, leads: leadItems, title: 'Tasks List', page_title: 'Upcoming Tasks', folder: 'Tasks'}
    )
    
    }
    catch(err) {
        return res.status(400).json({ error:'Server error.' });
    }

}

module.exports.deleteTaskItem_delete = async (req,res) => {

const taskID = req.body.id

    try {
        await Task.findOneAndDelete({  _id : taskID })
        res.status(200).json({ message:'Task Added' });
    }

    catch (err) {
        return res.status(400).json(err);
    }

}
//edit task route

module.exports.editTaskItem_put = async (req,res) => {

let id = req.body.id


try {
    await Task.findOneAndUpdate({_id: id}, {$set:{ 
    tasksTitleFieldVal: req.body.tasksTitleFieldVal, 
    clientNameFieldVal: req.body.clientNameFieldVal,
    dateDueFieldVal: req.body.dateDueFieldVal,
    statusFieldVal: req.body.statusFieldVal,
    priorityFieldVal: req.body.priorityFieldVal}});
    res.status(200).json({ message:'Task edited' });
} catch (err) {
    return res.status(400).json(err);
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

        const dealItems = await Deal.find({ owner:[userData._id]})

    const taskItems = await Task.find({ owner:[userData._id]}).sort({ dateDueFieldVal: 1 })
        
    res.render('index.ejs', {tasks: taskItems , allTasks: allTaskItems, deals: dealItems, title: 'Dashboard', page_title: 'Dashboard', folder: 'Dashboards'}
    )
    
    }
    catch(err) {
        return res.status(400).json(err);
    }
}

    
//get completed tasks

module.exports.getCompletedTaskItems_get =  async (req,res) => {

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
    
    const userID = res.locals.user.id

    const userEmail = res.locals.user.email  
    
    const userData = await User.findOne({email: userEmail})
    
    var total = await Task.countDocuments({owner:[userData._id]}); 

    var pages = Math.ceil(total / perPage);
    
    const leadData = await crm_lead.findOne({owner: [userID]})
    
        try {
         const allTaskItems = await Task.find({ owner:[userData._id]})
        
        const taskItems = await Task.find({ owner:[userData._id], statusFieldVal:'Completed'}).skip((perPage * page) - perPage).limit(perPage).sort({ [thingToSort]: sortOrderInNumerics })
    
        const leadItems = await crm_lead.find({ owner:[userData._id]})    
            
        res.render('completedtasks.ejs', {tasks: taskItems , allTasks: allTaskItems, sortOrder: sortOrder, thingToSort: thingToSort, current: page,  pages: pages, leads: leadItems, title: 'Completed Tasks', page_title: 'Completed Tasks', folder: 'Tasks'}
        )
        
        }
        catch(err) {
            return res.status(400).json(err);
        }
    
    }
    