const { checkUser } = require("../middlewar/authMiddleware");
const authController = require('./authController');
const mongoose = require('mongoose');
const {crm_lead} = require('../Models/crm')
const {crm_company} = require('../Models/crm')
const User = require('../Models/user')
const Task = require('../Models/task');
const Deal = require('../Models/deals')

//create a lead! 
module.exports.addLead_post = async (req,res) => {
//get user email
const userEmail = res.locals.user.email
const userData = await User.findOne({email: userEmail})

if (!userData) {
    console.log('User not found.')
}

try {

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

await User.updateOne({
    email: userEmail
}, {
    $push: {leads: leadData._id}
})

res.status(200).json({ message:'Contact added' })
}


 catch(err) {
    
    res.status(400).json({ error:'Error adding contact.' });
}
}

module.exports.getLeads_get = async (req,res) => {

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


const userEmail = res.locals.user.email

const userData = await User.findOne({email: userEmail})

var total = await crm_lead.countDocuments({owner:[userData._id]}); 

console.log(thingToSort, sortOrderInNumerics)

var pages = Math.ceil(total / perPage);

    try {

    const allTaskItems = await Task.find({ owner:[userData._id]}).sort({ dateDueFieldVal: 1 })
        
    const leads = await crm_lead.find({ owner:[userData._id]}).skip((perPage * page) - perPage).limit(perPage).sort({ [thingToSort]: sortOrderInNumerics })
        
    res.render('contacts', { leads: leads, sortOrder: sortOrder, allTasks: allTaskItems, thingToSort: thingToSort, current: page,  pages: pages, title: 'Contacts', page_title: 'Contacts', folder: 'CRM' })
    
    
    }
    catch(err) {
        console.log(err)
    }
}

//delete request!
module.exports.deleteLead_delete = async (req,res) => {

const userEmail = res.locals.user.email


const userData = await User.findOne({email: userEmail})


    let id = req.body.id

    try {
        await crm_lead.findOneAndDelete({  _id : id })
        res.status(200).json({ message:'Contact deleted' });
    }

    catch (err) {
        res.status(400).json({ error:'Error deleting contact' });
    }
}

//edit lead
module.exports.editLead_put = async(req,res) => {

let id = req.body.id

try {

    await crm_lead.findOneAndUpdate({_id: id}, {$set:{ 
        name: req.body.leadNameField, 
        company: req.body.company_nameField,
        date: req.body.dateField,
        score: req.body.leads_scoreField,
        phone: req.body.phone,
        location: req.body.locationField,
        tags: req.body.tagInputFieldValue,}});

        res.status(200).json({ message:'Contact edited' });
}

catch (err) {
    res.status(400).json({ error:'Error editing contact.' });
}
}

//get contact details 

module.exports.getContactDetails_get = async(req,res) => {

    const userId = res.locals.user.id
    let contactId = req.params.itemId

    
    try {

    const contact = await crm_lead.find({ _id: contactId })

    const deal = await Deal.find({ leadOwner: [contactId] })
    
    const company = await crm_company.find({ lead: contact[0].name , owner:[userId]})

    const allTaskItems = await Task.find({ owner:[userId]}).sort({ dateDueFieldVal: 1 })

    const task = await Task.find({_id: contact[0].tasks, owner:[userId]}).sort({ dateDueFieldVal: 1 })

        
    res.render('contact', {query : contactId, allTasks: allTaskItems,  contacts: contact, deals: deal, companies: company, tasks: task,  layout: 'Layout/layout-without-bradcrumb', title: 'Contact Details' , page_title: 'Contact Details', folder: 'Projects' });

    }
    catch (err) {
        res.status(400).json({ error:'Error getting contact details.' });
    }

}



  