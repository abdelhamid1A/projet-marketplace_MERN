require("dotenv").config();
const Admin = require("../models/Admin");
const Order = require("../models/order");
const Type = require("../models/Type");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  adminValidations,
  loginValidations,
} = require("./validations/dataValidations");

class AdminController {

  async adminRegister(req, res, next) {
    const { error } = adminValidations(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const emailExist = await Admin.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exist");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const { full_name, email, phone, address } = req.body

    const admin = new Admin({
      full_name,
      email,
      phone,
      password: hashedPassword,
      address
    });

    try {
      const savedAdmin = await admin.save();
      res.send(savedAdmin);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  async adminLogin(req, res, next) {
    const { error } = loginValidations(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.status(400).send("password or Email Invalid");

    const validPass = await bcrypt.compare(req.body.password, admin.password);
    if (!validPass) return res.status(400).send("password or Email Invalid ");
    if(admin.is_super_admin){

      const token = jwt.sign(
        { _id: admin._id, email: admin.email,is_super_admin:admin.is_super_admin,isAdmin:admin.isAdmin },
        process.env.ADMIN_TOKEN
      );
      res.status(200).send(token);
    }else if(admin.isAdmin){

      const token = jwt.sign(
        { _id: admin._id, email: admin.email,isAdmin:admin.isAdmin },
        process.env.ADMIN_TOKEN
      );
      res.status(200).send(token);
    }
  };

  async getAllAdmins(req, res, next) {
    try {
      const admins = await Admin.find();
      res.json(admins);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  async deleteAdmin(req, res, next) {
    try {
      const admin = await Admin.findByIdAndDelete({ _id: req.body.idadmin });

      if (!admin) {
        res.status(404).send("Admin Not Found");
      }
      else {
        res.send('admin deleted')
      }
    } catch (error) {
      console.log(error);
    }
  };
  async addType(req,res) {
    const{name,price_for_upgrade} = req.body
    const type = new Type({
      name,
      price_for_upgrade
    })
    console.log(type);
    try {
      const saveType = await type.save()
      res.status(200).send(saveType)
    } catch (error) {
      console.log(error);
    }
  }
  async getAllOrders(req,res){
   try {
    const orders = await Order.aggregate([
      {
        $lookup:
          {
            from: "products",
            localField: "id_product",
            foreignField: "_id",
            as: "product"
          }
     },
     {
      $lookup:
      {
        from: "sellers",
        localField: "id_seller",
        foreignField: "_id",
        as: "seller"
      }
     },
     {
      $lookup:
      {
        from: "users",
        localField: "id_buyer",
        foreignField: "_id",
        as: "buyer"
      } 
     }
   ])
  // const orders = await Order.find()
   res.status(200).send(orders)
   } catch (error) {
     console.log(error);
   }
  }
}

module.exports = new AdminController()
