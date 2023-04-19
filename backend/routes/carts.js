import {Router} from "express";
import cors from "cors";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import auth from "../middleware/auth.js";
import jwt from "jsonwebtoken";

const router = Router();


// create cart
router.get("/create", cors(), async (req, res) => {

    const token = req.headers['x-access-token'];
    if (token) {
        const user =  jwt.verify(token, "eyluleylul");
        try {
            const cart = await Cart.create(
                {customer: user}
            );
            console.log(cart);
            res.status(201).json(cart);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Server Error"});
        }
    }

    try {
        // const cart = await Cart.create({customer: mongoose.Types.ObjectId(customer)});
        //res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

// add to cart
router.post("add", cors(), auth, async (req, res) => {
    const {cartId, productId} = req.body;

    try {
        const cart = await Cart.findById(cartId);
        const product = await Product.findById(productId);

        if (!cart || !product) {
            return res.status(404).json({message: "Cart or product not found"});
        }

        cart.entries.push({product, quantity: 1});
        cart.totalNetPrice += product.price;

        await cart.save();

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

// remove from cart
router.post("remove", cors(), auth, async (req, res) => {
    const {cartId, entryId} = req.body;

    try {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(404).json({message: "Cart not found"});
        }

        const entry = cart.entries.find((entry) => entry._id.equals(entryId));

        if (!entry) {
            return res.status(404).json({message: "Entry not found"});
        }

        const product = await Product.findById(entry.product._id);

        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        cart.entries = cart.entries.filter((entry) => !entry._id.equals(entryId));
        cart.totalNetPrice -= product.price * entry.quantity;

        await cart.save();

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

export default router;
