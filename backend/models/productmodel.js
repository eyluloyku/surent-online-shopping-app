/*the product model*/

import mongoose from "mongoose"
const schema = mongoose.Schema;

const reviewSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'User',
             },
     },
    {
      timestamps: true,
    }
  )

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
    },
    images: {
        type: Array,
        default: []
    },
    reviews: [reviewSchema],
     
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    }

},{timestamps:true})


const Product = mongoose.model("Product", productSchema);

export default Product;
//module.exports = mongoose.model('Product',productSchema);
