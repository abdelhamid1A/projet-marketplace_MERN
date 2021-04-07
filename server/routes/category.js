const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getAllCategories);
router.delete("/", categoryController.categoryDelete);
router.put("/:id", categoryController.updateCategory);
router.post("/", categoryController.categoryRegisterer);
module.exports = router;