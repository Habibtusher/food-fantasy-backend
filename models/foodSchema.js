const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    rating:{
        type: Array
    },
    meal:{
        type: String,
    }

}, { timestamps: true });

const FoodSchema = mongoose.model('FoodSchema', foodSchema);
module.exports = FoodSchema;