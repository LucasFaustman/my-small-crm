const { checkUser } = require("../middlewar/authMiddleware");
const authController = require('./authController');
const User = require('../Models/user')
const {crm_lead} = require('../Models/crm')
const Deal = require('../Models/deals')

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
    

    
    }