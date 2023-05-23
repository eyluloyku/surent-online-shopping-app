import Order from '../models/Order.js'
import User from '../models/User.js'
import Product from '../models/productmodel.js';
import nodemailer from 'nodemailer';
import fs from 'fs'

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
            return res.status(200).json({ error: "No orders with matching id found." });
          }
      
          res.status(200).json(userOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}



const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'ssurent2@gmail.com',
    pass: 'rqmkwjzxcgojapnj',
  }
});

const sendEmailWithPDF = async (req, res) => {

  const {userEmail, pdfBase64} = req.body;

  const mailOptions = {
    from: 'ssurent2@gmail.com',
    to: userEmail,
    subject: 'Invoice PDF',
    attachments: [
      {
        filename: 'Invoice.pdf',
        content: Buffer.from(pdfBase64, 'base64'),
        contentType: 'application/pdf',
        disposition: 'inline'
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
};

const getOrdersByDateRange = async (req,res)=>{
  try {
      const { date1, date2 } = req.params //gives us the id that we type. 
      
      const dateOrders = await Order.aggregate([
          { $match : { dateOrdered: { $gte: new Date(date1), $lte: new Date(date2) } } },
          { $project: {
              status: 1,
              totalPrice: 1,
              dateOrdered: 1
          }
          }
      ]
      );
      
      
      if (!dateOrders.length) {
          return res.status(200).json({ error: "No orders found between given dates." });
        } 
    
      res.status(200).json(dateOrders); 
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
}




export {getOrders, sendEmailWithPDF, getOrdersByDateRange}