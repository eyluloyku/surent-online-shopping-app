const Product = require('../models/productmodel')
const mongoose = require('mongoose')

//get all products
const getAllProds = async(req,res)=>{
    const prods = await Product.find({}).sort({createdAt:-1}) //leave blank since we want all.

    res.status(200).json(prods)
}

//get single prod, query by id,name,category
const getProductById = async (req,res)=>{
    try {
        const {id} = req.params //gives us the id that we type.

        const tprod = await Product.findById(id);
        if(!tprod){
            return res.status(404).json({error:"No corresponding product with given id."})
        }
        res.status(200).json(tprod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getProductByName = async ({ query: { name } }, res) => {
    try {
        //well originally find was used but then found this method that was more efficient.
      const tprods = await Product.aggregate([
        {
          $match: {
            Pname: { $regex: new RegExp(name, 'i') }
          }
        },
        {
          $project: {
            _id: 1,
            Pname: 1,
            price: 1,
            stock: 1,
            variants: 1,
            description: 1,
            warranty: 1,
            Distribution_inf: 1,
            Discount_rate: 1,
            category: 1,
            rating: 1
          }
        }
      ]);
  
      if (!tprods.length) {
        return res.status(404).json({ error: "No products with matching name found." });
      }
  
      res.status(200).json(tprods);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

const getProductByCategory = async (req, res) => {
    try {
      const { Category } = req.query;
      const tprods = await Product.find({ Category });
  
      if (!tprods.length) {
        return res.status(404).json({ error: "No products with matching category found." });
      }
      res.status(200).json(tprods);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
};

//create new product
const createProd = async (req,res) =>{
    const {Pname,price,stock,variants, description, warranty, Distribution_inf, Discount_rate, category, rating } = req.body;
    //add prod document to db.
    try {
        const prod = await Product.create({
            Pname,
            price,
            stock,
            variants,
            description,
            warranty,
            Distribution_inf,
            Discount_rate,
            category,
            rating
        }); //this is async.
        res.status(200).json(prod);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

//update a product
const updateProduct = async(req,res) =>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such product"})
  }

  const product = await Product.findOneAndUpdate({_id:id},{...req.body}) //spread is used since we dont know how many field to update.
  if(!product){
    return res.status(404).json({error:"No corresponding product with given id."})
  }
  res.status(200).json(product);

}

//delete product
const deleteProduct = async(req,res) =>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such product"})
  }

  const product = await Product.findOneAndDelete({_id: id})
  if(!product){
    return res.status(404).json({error:"No corresponding product with given id."})
  }
  res.status(200).json(product);
}


module.exports = {
    createProd,
    getAllProds,
    getProductById,
    getProductByName,
    getProductByCategory,
    deleteProduct,
    updateProduct
}