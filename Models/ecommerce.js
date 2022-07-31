const mongoose = require('mongoose');
const validator = require('validator');

const productschema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, 'please upload image'],
    },
    name: {
        type: String,
        required: [true, 'please enter name'],
    },
    category: {
        type: String,
        required: [true, 'please enter category'],
    },
    stock: {
        type: Number,
        required: [true, 'please enter stock'],
    },
    price: {
        type: Number,
        required: [true, 'please enter price'],
    },
    orders: {
        type: Number,
        required: [true, 'please enter number orders'],
    },
    rating: {
        type: Number,
        required: [true, 'please enter rating'],
    },
    publishedDate: {
        type: Date,
        required: [true, 'please enter date of published'],
    },
});

const orderschema = new mongoose.Schema({
    orderId: {
        type: String,
        required: [true, 'please enter orderid'],
    },
    customer: {
        type: String,
        required: [true, 'please enter customer'],
    },
    product: {
        type: String,
        required: [true, 'please enter product name'],
    },
    orderDate: {
        type: Date,
        required: [true, 'please enter  order date'],
    },
    amount: {
        type: Number,
        required: [true, 'please enter  amount'],
    },
    payment: {
        type: String,
        required: [true, 'please enter payment method'],
    },
    status: {
        type: String,
        required: [true, 'please delivery status'],
    },
});

const customerschema = new mongoose.Schema({
    customerId: String,
    customer: {
        type: String,
        required: [true, 'please enter customer name'],
    },
    email: {
        type: String,
        uniqued: true,
        validate: [validator.isEmail, 'please provide valid email']
    },
    phone: {
        type: String,
        min: 8,
        required: [true, 'please enter phone number'],
    },
    date: {
        type: Date,
        required: [true, 'please enter joining date'],
    },
    status: {
        type: String,
        required: [true, 'please enter status'],
    },
});

orderschema.pre('save', () => {
    this.orderDate = new Date(this.orderDate)
})

customerschema.pre('save', () => {
    this.date = new Date(this.date)
})

const product = mongoose.model('product', productschema);
const order = mongoose.model('order', orderschema);
const customer = mongoose.model('customer', customerschema);
module.exports = { product, order, customer };

