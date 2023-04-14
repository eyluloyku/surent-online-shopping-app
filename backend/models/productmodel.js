/*the product model*/

const mongoose = require('mongoose');
const schema = mongoose.Schema;

//pass object as argument, this is our schema.
const productSchema = new mongoose.Schema({
    Pname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    variants:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required:false
    },
    warranty: {
        type: Number,
        min: 0,
        max: 365,
        default: 30,
        required: false
    },
    Distribution_inf: {
        type:String,
        required:false
    },
    Discount_rate:{
        type:Number,
        required:false
    },
    category:{
        type:String,
        required:false
    },
    rating:{
      type:Number,
      min: 0,
      max: 5,
      default: 0,
      required: false  
    }
},{timestamps:true})

module.exports = mongoose.model('Product',productSchema);
