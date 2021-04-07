require("dotenv").config();
const Seller = require("../models/Seller");
const Product = require("../models/Product");
const Type = require("../models/Type");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { randomPassword, sendMail } = require('./methodController')
const {
    sellerValidations,
    loginValidations,
} = require("./validations/dataValidations");

class SellerController {

    async sellerRegister(req, res, next) {
        const tempPassword = randomPassword(6)
        req.body.password = tempPassword
        const { error } = sellerValidations(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const emailExist = await Seller.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send("Email already exist");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const seller = new Seller({
            full_name: req.body.full_name,
            email: req.body.email,
            type: "Starter",
            phone: req.body.phone,
            password: hashedPassword,
            address: req.body.address,
            turnOver: 0,
            productsCount: 0,
            identity: req.body.identity,
        });

        try {
            const savedSeller = await seller.save();
            const teminfo = {
                tempPassword
            }
            sendMail(teminfo)
            res.status(200).json({savedSeller:'add'});
        }
         catch (error) {
            res.status(400).send(error);
        }
    };

    async resetPassword(req, res, next) {
        const token = req.header("auth-token");
        const tokenDecode = jwt.verify(token, process.env.SELLER_TOKEN);
        

            const {password,newPassword} = req.body
            try {
                const seller = await Seller.findOne({ email: tokenDecode.email });
                if(seller && !seller.is_password_reset){
                    bcrypt.compare(password,seller.password,async (err,result)=>{
                        if(result){
                            const hashedPassword = await bcrypt.hash(newPassword, 10);
                            seller.password = hashedPassword;
                            seller.is_password_reset = true
                            // seller.isValid = true;
                            const newPass = await seller.save();
                            res.status(201).send(newPass);
                        }else{
                            res.status(401).send("password incorrect check your email");
                        }
                    })
                }
              
            } catch (error) {
                console.log(error);
            }
       
    };

    async sellerLogin(req, res, next) {
        const { email, password } = req.body
        const { error } = loginValidations(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        try {
            const seller = await Seller.findOne({ email });
            if (seller) {
                bcrypt.compare(password, seller.password, (err, result) => {
                    if (result) {
                        if (seller.is_password_reset) {
                            const token = jwt.sign({ email: seller.email, _id: seller._id }, process.env.SELLER_TOKEN)
                            res.status(200).json({ seller, token })
                        } else {
                            const token = jwt.sign({ is_password_reset: seller.is_password_reset, _id: seller._id,email:seller.email }, process.env.SELLER_TOKEN)
                            res.status(200).json({ seller, token, message: 'redirect to reset password' })
                        }
                    } else {
                        res.status(200).json({ message: 'email or password incorrect' })
                    }
                })
            } else {
                res.status(401).json({ message: 'we can\'t find this email' })
            }
        } catch (error) {

        }
    };

    async validSeller(req, res, next) {
        const seller = await Seller.findById({ _id: req.body.id });
        if (!seller) {
            res.status(404).send({ message: "Seller not found" });
        } else {
            seller.isValid = true;
            const validSeller = await seller.save();
            res.status(201).json({message:'Seller validate'});
        }
    };

    async getAllSellers(req, res, next) {
        const status = req.params.status
        try {
            const sellers = await Seller.find({isValid:status});
            res.json(sellers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    async sellerPack(req, res, next) {
        // const token = req.header("auth-token");

        // const id_seller = jwt.verify(token, process.env.SELLER_TOKEN)._id;
        const id_seller = req.params.id;

        const type = req.body.type;

        const seller = await Seller.findById({ _id: id_seller });
        seller.type= type
        seller.save()
        
        // if (seller) {
        //     seller.type = type;
        //     // seller.turnOver += 5000;

        //     const updateSeller = await seller.save();
        //     res.status(201).send(updateSeller);
        // }
        //  else if (type == "Expert") {
        //     seller.type = type;
        //     seller.turnOver += 20000;
        //     const updateSeller = await seller.save();
        //     res.status(201).send(updateSeller);
        // }
    };
    async findSeller(req,res){
        const token = req.header('auth-token');
        const idFromToken = jwt.verify(token,process.env.SELLER_TOKEN)._id
        try {
            const findUser = await Seller.findById(idFromToken).select('-password')
            if(findUser){
                res.status(200).json({findUser})
            }else{
                res.status(404).send('user not found')
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getTypes(req,res){
        try {
           const getTypes = await Type.find()
           res.status(200).send(getTypes) 
        } catch (error) {
            console.log(error);
        }
    }
    async sellerSuspend(req,res){
        const seller = await Seller.findById({ _id: req.body.id });
        if (!seller) {
            res.status(404).send({ message: "Seller not found" });
        } else {
            seller.isSuspend = true;
            const validSeller = await seller.save();
            res.status(201).json({message:'Seller suspended'});
        }
    }

     turnOverUpdated = async (req, res, next) => {
        const seller = await Seller.findById({ _id: req.params.id });
      
        if (!seller) {
          res.status(404).send({ message: "Seller not found" });
        }
      
        seller.turnOver += req.body.turnOver;
        seller.type=req.body.type
      
        try {
          const sellerUpdated = await seller.save();
          res.status(201).send(sellerUpdated);
        } catch (error) {
          res.status(400).send({ message: error.message });
        }
      };
    async productCount(req,res){
        const token = req.header('auth-token')
        const id = jwt.decode(token,process.env.SELLER_TOKEN)._id
        console.log(id);
        try {
            const count = await Product.find({id_seller:id})
            .count({}, function(err, result) {
                if (err) {
                  console.log(err);
                } else {
                  res.status(200).json(result);
                }
              })
            // res.status(200).send(count)
        } catch (error) {
            console.log(error);
        }
    }
     updateTurnOver = async (req, res, next) => {
        const seller = await Seller.findById({ _id: req.params.id });
      
        if (!seller) {
          res.status(404).send({ message: "Seller not found" });
        }
      
        seller.turnOver += req.body.turnOver;
      
        try {
          const sellerUpdated = await seller.save();
          res.status(201).send(sellerUpdated);
        } catch (error) {
          res.status(400).send({ message: error.message });
        }
      };
}

module.exports = new SellerController()
