const User = require('../Models/user');
const {crm_company} = require('../Models/crm');
const { checkUser } = require("../middlewar/authMiddleware");
const authController = require('./authController');
const {crm_lead} = require('../Models/crm');
const Task = require('../Models/task');


//create company
module.exports.addCompany_post = async (req,res) => {



    //get user email
const userEmail = res.locals.user.email



//find user by email


const userData = await User.findOne({email: userEmail})

//add check if there is user, go to next. if not, console.log error
if (!userData) {
    console.log('User not found.')
}

// extract the lead payload , then create a new company with the info we got from the fetch


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

module.exports.getCompanies_get = async (req,res) => {


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



//find user by email

const userData = await User.findOne({email: userEmail})

const leadData = await crm_lead.findOne({owner: [userID]})

// total number of records from database for pagination 

var total = await crm_company.countDocuments({owner:[userData._id]}); 



// Calculating number of pagination links required
var pages = Math.ceil(total / perPage);

try {

    //declare a variable named companyItems that await to find companies in the database with an owner of the users id

const companies = await crm_company.find({ owner:[userData._id]}).skip((perPage * page) - perPage).limit(perPage).sort({ [thingToSort]: sortOrderInNumerics })

//pass all companies in, so when picking a company from form, we onmly pick companies with no leads assigned to a company already

const allCompanies = await crm_company.find({ owner:[userData._id]})

//get tasks for header
const allTaskItems = await Task.find({ owner:[userData._id]}).sort({ dateDueFieldVal: 1 })


const leadItems = await crm_lead.find({ owner:[userData._id]})

//render tasks.ejs with the tasks of the user, as well as the title, page title, and folder for the views
    
res.render('companies', { companies: companies, allTasks: allTaskItems, allCompanies: allCompanies, sortOrder: sortOrder, thingToSort: thingToSort, current: page,  pages: pages, leads: leadItems, title: 'Companies', page_title: 'Companies', folder: 'CRM' })
}

catch(err) {
    console.log(err)
}


}



module.exports.deleteCompany_delete = async (req,res) => {
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
        await crm_company.findOneAndDelete({  _id : id })
        //send back that the task was deleted
        res.send('Task deleted')
    }

    catch (err) {
        console.log(err)
    }
}



module.exports.editCompany_put = async (req,res) => {
    //get id 
let id = req.body.id

//use a try catch


try {

    await crm_company.findOneAndUpdate({_id: id}, {$set:{ //find one company and update. find one with the id of the one inside the ejs
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