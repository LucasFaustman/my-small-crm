const User = require('../Models/user')
const {crm_company} = require('../Models/crm')
const { checkUser } = require("../middlewar/authMiddleware");
const authController = require('./authController');
const {crm_lead} = require('../Models/crm')

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


    console.log(req.body)

    res.send('Company added')

}

module.exports.getCompanies_get = async (req,res) => {

    //get user id

const userID = res.locals.user.id


    //get user email
const userEmail = res.locals.user.email

//find user by email

const userData = await User.findOne({email: userEmail})

const leadData = await crm_lead.findOne({owner: [userID]})

try {

    //declare a variable named companyItems that await to find tasks in the database with an owner of the users id

const companies = await crm_company.find({ owner:[userData._id]})

const leadItems = await crm_lead.find({ owner:[userData._id]})

//render tasks.ejs with the tasks of the user, as well as the title, page title, and folder for the views
    
//res.render('leads.ejs', {tasks: taskItems , title: 'Tasks List', page_title: 'Upcoming Tasks', folder: 'Tasks'}
res.render('companies', { companies: companies, leads: leadItems, title: 'Companies', page_title: 'Companies', folder: 'CRM' })
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