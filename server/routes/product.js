const router = require("express").Router();
const productController = require("../controllers/productController");
const {upload} = require('../config/upload')


router.get("/", productController.getAllProducts);
router.post("/",upload.array('picture',3), productController.productRegister);
router.put("/:id", productController.productUpdated);
router.delete("/", productController.productDeleted);
router.get("/allProduct", productController.allProduct);
router.get("/:id", productController.getOneProduct);

module.exports = router;
