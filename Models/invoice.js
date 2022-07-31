const mongoose = require('mongoose');
const validator = require('validator');

const invoiceschema = new mongoose.Schema({
    invoiceId: {
        type: String,
        required: [true, 'please enter invoice_number'],
    },
    date: {
        type: Date,
        required: [true, 'please enter date'],
    },
    status: {
        type: String,
        required: [true, 'please enter payment status'],
    },
    amount: {
        type: Number,
        required: [true, 'please enter total amount'],
    },
    name: {
        type: String,
        required: [true, 'please enter customer'],
    },
    img: {
        type: String,
        required: [true, 'please upload image'],
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'please provide valid email']
    },
    country: {
        type: String,
        required: [true, 'please enter country'],
    },
    registration_no: {
        type: String,
    },
    website: {
        type: String,
    },
    contact: {
        type: Number,
        min: 8
    },
    company_address: {
        type: String,
    },
    postalcode: {
        type: Number,
    },
    billing_name: {
        type: String,
    },
    billing_address: {
        type: String,
    },
    billing_phone: {
        type: String,
        min: 8
    },
    billing_taxno: {
        type: String,
    },
    shipping_name: {
        type: String,
    },
    shipping_address: {
        type: String,
    },
    shipping_phone: {
        type: String,
        min: 8
    },
    shipping_taxno: {
        type: String,
    },
    product_detail: [{
        type: mongoose.Schema.ObjectId,
        ref: 'product',
    }],
    sub_total: {
        type: Number,
    },
    estimated_tax: {
        type: String,
    },
    discount: {
        type: String,
    },
    shipping_charge: {
        type: String,
    },
    total_amount: {
        type: Number,
    },
    payment_method: {
        type: String,
    },
    card_holder_name: {
        type: String,
    },
    card_number: {
        type: String,
    },
    notes: {
        type: String,
    },

});

const invoice = mongoose.model('invoice', invoiceschema);
module.exports = invoice;

