import Order from '../models/Order.js'
import User from '../models/User.js'
import Product from '../models/productmodel.js';

//get all orders of user
const getOrders = async (req,res)=>{
    try {
        const {id} = req.params //gives us the id that we type.

        const tuser = await User.findById(id);
        if(!tuser){
            return res.status(404).json({error:"No corresponding user with given id."})
        }
        const userOrders = await Order.aggregate([
            { $match : { user : { $eq : tuser._id } } },
            { $project: {

                items: 1,
                status: 1,
                user: 1,
                shippingAddress: 1,
                paymentMethod: 1,
                totalPrice: 1,
                dateOrdered: 1
            }
            }
        ]
        );
        
        
        if (!userOrders.length) {
            return res.status(404).json({ error: "No orders with matching id found." });
          }
      
          res.status(200).json(userOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export {getOrders}