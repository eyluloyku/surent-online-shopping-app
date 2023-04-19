import Cart from "../models/Cart.js";

class CartService {
    async createCart(user) {
        const cart = new Cart({ user });
        return await cart.save();
    }

    async addToCart(cartId, product, quantity) {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }

        const existingProductIndex = cart.entries.findIndex(
            (entry) => entry.product.toString() === product.id
        );

        if (existingProductIndex > -1) {
            cart.entries[existingProductIndex].quantity += quantity;
        } else {
            cart.entries.push({ product: product.id, quantity });
        }

        cart.totalNetPrice += product.price * quantity;
        return cart.save();
    }

    async removeFromCart(cartId, entryId) {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }

        const entry = cart.entries.find((entry) => entry.id === entryId);
        if (!entry) {
            throw new Error("Entry not found");
        }

        const { product, quantity } = entry;
        cart.entries = cart.entries.filter((entry) => entry.id !== entryId);
        cart.totalNetPrice -= product.price * quantity;

        return cart.save();
    }
}

export default new CartService();
