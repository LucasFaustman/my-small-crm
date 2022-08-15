const { checkUser } = require("../middlewar/authMiddleware");
const authController = require('./authController');
const mongoose = require('mongoose');


const {crm_lead} = require('../Models/crm')
const {crm_company} = require('../Models/crm')
const User = require('../Models/user')
const Task = require('../Models/task');
const task = require("../Models/task");



//create a lead! 
module.exports.addLead_post = async (req,res) => {
//get user email
const userEmail = res.locals.user.email



//find user by email


const userData = await User.findOne({email: userEmail})

//add check if there is user, go to next. if not, console.log error
if (!userData) {
    console.log('User not found.')
}


// extract the lead payload , then create a new lead with the info we got from the fetch


const leadData = await crm_lead.create({
    name: req.body.leadNameField,
    company: req.body.company_nameField,
    date: req.body.dateField,
    score: req.body.leads_scoreField,
    phone: req.body.phone,
    location: req.body.locationField,
    tags: req.body.tagInputFieldValue,
    owner: userData._id
})


//now push lead id to the user database using push

await User.updateOne({
    email: userEmail
}, {
    $push: {leads: leadData._id}
})

console.log(leadData._id)

 res.send('lead added')
}

module.exports.getLeads_get = async (req,res) => {
        //get user email
const userEmail = res.locals.user.email

//find user by email

const userData = await User.findOne({email: userEmail})

    try {

        //declare a variable named taskItems that await to find tasks in the database with an owner of the users id

    const leads = await crm_lead.find({ owner:[userData._id]}).sort({ date: -1 })

    //render tasks.ejs with the tasks of the user, as well as the title, page title, and folder for the views
        
    //res.render('leads.ejs', {tasks: taskItems , title: 'Tasks List', page_title: 'Upcoming Tasks', folder: 'Tasks'}
    res.render('contacts', { leads: leads, title: 'Contacts', page_title: 'Contacts', folder: 'CRM' })
    
    
    }
//if any errors, console log them
    catch(err) {
        console.log(err)
    }
}


module.exports.deleteLead_delete = async (req,res) => {
    //delete request!

        //get user email
const userEmail = res.locals.user.email

//find user by email

const userData = await User.findOne({email: userEmail})

    //lets do a try

    //get the id
    let id = req.body.id
    console.log(id)

    //use a try
    try {
        //find oneanddelete from our id
        await crm_lead.findOneAndDelete({  _id : id })
        //send back that the task was deleted
        res.send('Task deleted')
    }

    catch (err) {
        console.log(err)
    }



}

module.exports.editLead_put = async(req,res) => {


    //get id 
let id = req.body.id

//use a try catch


try {

    await crm_lead.findOneAndUpdate({_id: id}, {$set:{ //find one lead and update. find one with the id of the one inside the ejs
        name: req.body.leadNameField, //and pass in the things we want to update
        company: req.body.company_nameField,
        date: req.body.dateField,
        score: req.body.leads_scoreField,
        phone: req.body.phone,
        location: req.body.locationField,
        tags: req.body.tagInputFieldValue,}});

        res.send('Task edited')

}

catch (err) {
    console.log(err)
}
}


module.exports.getContactDetails_get = async(req,res) => {


    let contactId = req.params.itemId

    
    try {

        //declare a variable named contact that await to find leads in the database with that specific lead id

    const contact = await crm_lead.find({ _id: contactId })
    

    const company = await crm_company.find({ lead: contact[0].name })


    const task = await Task.find({_id: contact[0].tasks}).sort({ dateDueFieldVal: 1 })

        
    res.render('contact', {query : contactId, contacts: contact, companies: company, tasks: task,  layout: './layout/layout-without-bradcrumb', title: 'Project Overview' , page_title: 'Project Overview', folder: 'Projects' });

    }
    catch (err) {
        console.log(err)
    }

}


  