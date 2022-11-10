const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    sub_total: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    }  
},{
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;