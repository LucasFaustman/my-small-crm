const { checkUser } = require("../middlewar/authMiddleware");
const authController = require('./authController');
const User = require('../Models/user')
const Task = require('../Models/task')
const {crm_lead} = require('../Models/crm')
const Deal = require('../Models/deals')
const {crm_company} = require('../Models/crm')


//create deal
module.exports.addDeal_post = async (req,res) => {

const userID = res.locals.user.id


const leadData = await crm_lead.findOne({owner: [userID], name:  req.body.contactVal, company: req.body.companyNameVal})

const userData = await User.findOne({_id: userID})

if (!leadData || !userData) {
    return res.status(400).json({ error:'Company name does not match' });
 } 

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


await crm_lead.updateOne({
    owner: [userID],
    name: req.body.contactVal,
    company: req.body.companyNameVal
}, { 
    $push: {deals: dealData._id}
})

res.status(200).json({ message:'Deal added' });
}

//get deal
module.exports.getDeals_get =  async (req,res) => {

const userID = res.locals.user.id
const userEmail = res.locals.user.email
const userData = await User.findOne({email: userEmail})
const leadData = await crm_lead.findOne({owner: [userID]})
    
try {


const dealItems = await Deal.find({ owner:[userData._id]})
const allTaskItems = await Task.find({ owner:[userData._id]}).sort({ dateDueFieldVal: 1 })
const leadItems = await crm_lead.find({ owner:[userData._id]})
const companyItems = await crm_company.find({ owner: [userData._id] })

    
    res.render('deals.ejs', {deals: dealItems , allTasks: allTaskItems, leads: leadItems, companies: companyItems, title: 'Deals', page_title: 'Deals', folder: 'CRM' }
)

}
    catch(err) {
    console.log(err)
} 
    }

    //edit deal
module.exports.editDealStage_put = async (req,res) => {

    let dealId = req.body.newItemId
    let newStage = req.body.editedStageVal
try {
    await Deal.findOneAndUpdate({_id: dealId}, {$set:{ 
        stage: newStage
    }});
    res.send('deal edited')
} catch (err) {
    console.log(err)
}
};

//get deal data
module.exports.getDealsData_get =  async (req,res) => {
    
 const userID = res.locals.user.id
    
const userEmail = res.locals.user.email

const userData = await User.findOne({email: userEmail})

const dealItems = await Deal.find({ owner:[userData._id]})

res.send(dealItems)



}

