import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            Pname: String,
            price: Number
        }
    ],
    totalPrice: {
        type: Number,
        default: 0.0
    }
});

cartSchema.pre('save', async function (next) {
    try {
        let total = 0;
        for (let i = 0; i < this.products.length; i++) {
            const product = await mongoose.model('Product').findById(this.products[i].productId);
            this.products[i].Pname = product.Pname;
            this.products[i].price = product.price;
            total += (product.price * this.products[i].quantity);
        }
        this.totalPrice = total;
        next();
    } catch (error) {
        next(error);
    }
});

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
