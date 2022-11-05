const User = require('../Models/user');
const {crm_company} = require('../Models/crm');
const { checkUser } = require("../middlewar/authMiddleware");
const authController = require('./authController');
const {crm_lead} = require('../Models/crm');
const Task = require('../Models/task');


//create company
module.exports.addCompany_post = async (req,res) => {

const userEmail = res.locals.user.email

const userData = await User.findOne({email: userEmail})

const leadData = await crm_lead.findOne({owner: [userData._id], company: req.body.companyName, name: req.body.ownerName})

const companySearch = await crm_company.findOne({owner: [userData._id], name: req.body.companyName})

if (!leadData) {
    return res.status(400).json({ error:'Company name and contact name does not match' });
}

if (companySearch) {
    return res.status(400).json({ error:'Company already created.' });
}


if (!userData) {
   return res.status(400).json({ message:'User not found' });
}

const companyData = await crm_company.create({
    name: req.body.companyName,
    lead: req.body.ownerName,
    star_value: req.body.starValue,
    location: req.body.locationField,
    employee: req.body.employeeCount,
    website: req.body.websiteField,
    contact_email: req.body.contactEmail,
    industry_type: req.body.industryType,
    owner: userData._id
})

//now push company id to the user database using push

await User.updateOne({
    email: userEmail
}, {
    $push: {companies: companyData._id}
})

     res.status(200).json({ message:'Company added' });

}

//get companies
module.exports.getCompanies_get = async (req,res) => {

const userID = res.locals.user.id
const userEmail = res.locals.user.email
const userData = await User.findOne({email: userEmail})
const leadData = await crm_lead.findOne({owner: [userID]})

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

var total = await crm_company.countDocuments({owner:[userData._id]}); 

var pages = Math.ceil(total / perPage);

try {
const companies = await crm_company.find({ owner:[userData._id]}).skip((perPage * page) - perPage).limit(perPage).sort({ [thingToSort]: sortOrderInNumerics })
const allCompanies = await crm_company.find({ owner:[userData._id]})
const allTaskItems = await Task.find({ owner:[userData._id]}).sort({ dateDueFieldVal: 1 })
const leadItems = await crm_lead.find({ owner:[userData._id]})

res.render('companies', { companies: companies, allTasks: allTaskItems, allCompanies: allCompanies, sortOrder: sortOrder, thingToSort: thingToSort, current: page,  pages: pages, leads: leadItems, title: 'Companies', page_title: 'Companies', folder: 'CRM' })
}

catch(err) {
    res.status(400).json({ error:'Server failure.' });
}

}

//delete company
module.exports.deleteCompany_delete = async (req,res) => {

const userEmail = res.locals.user.email

const userData = await User.findOne({email: userEmail})

    let id = req.body.id

    try {
        await crm_company.findOneAndDelete({  _id : id })
        res.status(200).json({ message:'Company added' });
    }

    catch (err) {
        console.log(err)
    }
}

//edit company
module.exports.editCompany_put = async (req,res) => {

const userEmail = res.locals.user.email

const userData = await User.findOne({email: userEmail})

let id = req.body.id

const leadData = await crm_lead.findOne({owner: [userData], company: req.body.companyName, name: req.body.ownerName})

if (!leadData) {
    return res.status(400).json({ error:'Company name and contact name does not match' });
}


try {

    await crm_company.findOneAndUpdate({_id: id}, {$set:{ 
    name: req.body.companyName,
    lead: req.body.ownerName,
    star_value: req.body.starValue,
    location: req.body.locationField,
    employee: req.body.employeeCount,
    website: req.body.websiteField,
    contact_email: req.body.contactEmail,
    industry_type: req.body.industryType
}});
res.status(200).json({ message:'Company edited' });
}

catch (err) {
    res.status(400).json({ error:'Server failure.' });
}
}