require("dotenv").config();
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')


class productController{

    async productRegister (req, res, next) {
        // console.log(req.body);
        // // console.log(req.files);
        // // console.log(req.files);
        // const token = req.header("auth-token");
        // const id_seller = jwt.verify(token, process.env.SELLER_TOKEN)._id;
        // // console.log(req.files[0]);
        // var pictures =[]
        // for (let i = 0; i < req.files.length; i++) {
        //     pictures.push(req.files[i].filename)
            
        // }
        // // console.log(pictures)
        // const newProduct = new Product({
        //     name: req.body.name,
        //     description: req.body.description,
        //     id_category: req.body.id_category,
        //     id_seller: id_seller,
        //     price: req.body.price,
        //     picture: pictures,
        // });
        // try {
        //     const product = await newProduct.save();
        //     res.status(201).send(product);
        // } catch (error) {
        //     res.status(400).send({ message: error.message });
        // }
        const token = req.header("auth-token");
        const id_seller = jwt.verify(token, process.env.SELLER_TOKEN)._id;

        const seller = await Seller.findOne({ _id: id_seller });

        if (seller.type === "Starter" && seller.productsCount < 10) {
            const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            id_category: req.body.id_category,
            id_seller: id_seller,
            price: req.body.price,
            picture: req.files[0].filename,
            });

            seller.productsCount += 1;
            try {
            const product = await newProduct.save();
            const updatedSeller = await seller.save();
            res.status(201).send(product);
            } catch (error) {
            res.status(400).send({ message: error.message });
            }
        } else if (seller.type === "Pro" && seller.productsCount < 50) {
            const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            id_category: req.body.id_category,
            id_seller: id_seller,
            price: req.body.price,
            picture: req.files[0].filename,
            isBuyed: false,
            });

            seller.productsCount += 1;
            try {
            const product = await newProduct.save();
            const updatedSeller = await seller.save();
            res.status(201).send(product);
            } catch (error) {
            res.status(400).send({ message: error.message });
            }
        } else if (seller.type === "Expert") {
            const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            id_category: req.body.id_category,
            id_seller: id_seller,
            price: req.body.price,
            picture: req.files[0].filename,
            isBuyed: false,
            });

            seller.productsCount += 1;
            try {
            const product = await newProduct.save();
            const updatedSeller = await seller.save();
            res.status(201).send("Product Added !");
            } catch (error) {
            res.status(400).send({ message: error.message });
            }
        } else {
            res.send("You achieved the limit Please upgrade your Account");
        }
    };

    async getAllProducts(req, res, next)  {
        const token = req.header('auth-token')
        const id_seller = jwt.verify(token,process.env.SELLER_TOKEN)._id
        // console.log(id_seller);
        try {
            // const products = await Product.find();
            const products = await Product.aggregate([
                
                { $match : {id_seller:mongoose.Types.ObjectId(id_seller)}},
                
                {$lookup:{
                    from: "categories",
                    localField: "id_category",
                    foreignField: "_id",
                    as: "category"
                    }
                }
                
            ])
            res.status(200).send(products);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
    async allProduct(req,res){
        try {
            const {page,limit} =req.query;
            const product = await Product.find()
            .limit(limit*1)
            .skip((page -1)*limit).exec()
            // .limit(4)
            // .skip(limit*1).exec()
            res.status(200).send(product)
        } catch (error) {
            console.log(error);
            res.status(404).send(error)
        }
    }
    
   async productUpdated (req, res, next) {
        const token = req.header("auth-token");
        const id_seller = jwt.verify(token, process.env.SELLER_TOKEN)._id;
    
        const product = await Products.findById({ _id: req.params.id });
        if (!product) {
            res.status(404).send({ message: "Product not found" });
        }
    
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        product.picture = req.body.picture;
        product.id_seller = id_seller;
        product.id_category = req.body.id_category;
    
        try {
            const newProduct = await product.save();
            res.status(201).send(newProduct);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    async productDeleted (req, res, next) {
        try {
            const product = await Product.deleteOne({ _id: req.body.id });
            res.status(201).send(product);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
    
    async getOneProduct (req, res, next) {
        try {
            const product = await Product.findOne({ _id: req.params.id });
            res.status(201).send(product);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };
}

module.exports = new productController()

