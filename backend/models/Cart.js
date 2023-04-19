import mongoose from "mongoose";
import { ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    customer: {
        type: ObjectId,
        ref: "User",
    },
    entries: [{
        product: {
            type: ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: [String],
        enum: ["cart", "order"],
        default: ["cart"],
    },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
