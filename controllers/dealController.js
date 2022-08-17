const { checkUser } = require("../middlewar/authMiddleware");
const authController = require('./authController');
const User = require('../Models/user')
const Task = require('../Models/task')
const {crm_lead} = require('../Models/crm')
const Deal = require('../Models/deals')
const {crm_company} = require('../Models/crm')

//create deal
module.exports.addDeal_post = async (req,res) => {


    //get user id
const userID = res.locals.user.id

//we are going to find a lead that matches the iser id, the name of the contact, and the name of the company 

const leadData = await crm_lead.findOne({owner: [userID], name:  req.body.contactVal, company: req.body.companyNameVal})



const userData = await User.findOne({_id: userID})

//add check if there is user, go to next. if not, console.log error
if (!userData) {
    console.log('User not found.')
}


// extract the lead payload , then create a new deal with the info we got from the fetch


const dealData = await Deal.create({
    dealTitle: req.body.dealTitleVal,
    stage: req.body.stageValueVal,
    value: req.body.dealValueVal,
    dueDate: req.body.dueDateVal,
    description: req.body.contactDescriptionVal,
    companyName: req.body.companyNameVal,
    leadOwner: leadData,
    owner: userID
})

//now push deal id to the lead. should have the same user id as an owner, contact and company name

await crm_lead.updateOne({
    owner: [userID],
    name: req.body.contactVal,
    company: req.body.companyNameVal
}, { //then push our dealdata._id to the deals array
    $push: {deals: dealData._id}
})


    console.log(req.body)

    res.send('Company added')

}

module.exports.getDeals_get =  async (req,res) => {

    //get user id
    
    const userID = res.locals.user.id
    
    
        //get user email
    const userEmail = res.locals.user.email


    //find user by email for leads

const userData = await User.findOne({email: userEmail})

//find lead by id for deals

const leadData = await crm_lead.findOne({owner: [userID]})
    
try {

    //declare a variable named taskItems that await to find tasks in the database with an owner of the users id

const dealItems = await Deal.find({ owner:[userData._id]})

const taskItems = await Task.find({ owner:[userData._id]}).sort({ dateDueFieldVal: 1 })

const leadItems = await crm_lead.find({ owner:[userData._id]})

const companyItems = await crm_company.find({ owner: [userData._id] })

//render deals.ejs with our dealitems and our leads information as well as companies
    
res.render('deals.ejs', {deals: dealItems , tasks: taskItems, leads: leadItems, companies: companyItems, title: 'Deals', page_title: 'Deals', folder: 'CRM' }
)

}
//if any errors, console log them
catch(err) {
    console.log(err)
}
    
    }
