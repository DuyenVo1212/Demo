const mongoose = require('mongoose')

const candleafSchema = new mongoose.Schema({
    img: {
    type: String,
    required: [true, 'please provide img'],
    },
    name: {
    type: String,
    required: [true, 'please provide name'],
    },
    popular: {
    type: Boolean,
    default: false,
    },
    price: {
    type: Number,
    required: [true, 'please provide price']
    },
    amount: {
    type: Number,
    default: 1
    }, 
    color: {
    type: String,
    required: [true, 'please provide color']
    },
    category:{
        type: String,
        required: [true, 'please provide category']
    }
})

module.exports = mongoose.model('Candleaf', candleafSchema)
