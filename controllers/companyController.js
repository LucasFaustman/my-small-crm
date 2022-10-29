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

if (!userData) {
    console.log('User not found.')
}
// extract the company payload , then create a new company with the info we got from the fetch


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

    res.send('Company added')

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
    console.log(err)
}

}

//delete company
module.exports.deleteCompany_delete = async (req,res) => {

const userEmail = res.locals.user.email

const userData = await User.findOne({email: userEmail})

    let id = req.body.id

    console.log(id)

    try {
        await crm_company.findOneAndDelete({  _id : id })
        res.send('Task deleted')
    }

    catch (err) {
        console.log(err)
    }
}

//edit company
module.exports.editCompany_put = async (req,res) => {

let id = req.body.id

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
        res.send('Task edited')
}

catch (err) {
    console.log(err)
}
}