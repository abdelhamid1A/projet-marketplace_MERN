const { string } = require("joi");
const mongoose = require("mongoose");
const {randomPassword} = require('../controllers/methodController')

const sellerSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      default:false
    },
    type: {
      type: String,
      default:'starter'
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required : true
    },
    address: {
      type: String,
    },
    turnOver: {
      type: Number,
    },
    productsCount: {
      type: Number,
    },
    identity: {
      type: String,
      required: true,
    },
    is_password_reset:{
      type:Boolean,
      default : false
    },
    isSuspend:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seller", sellerSchema);
