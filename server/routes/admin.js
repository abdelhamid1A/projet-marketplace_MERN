const router = require("express").Router();
const AdminController = require("../controllers/adminController");

router.post("/", AdminController.adminRegister);
router.post("/login", AdminController.adminLogin);
router.post("/addType", AdminController.addType);
router.get("/", AdminController.getAllAdmins);
router.get("/orders", AdminController.getAllOrders);
router.delete('/delete', AdminController.deleteAdmin)

module.exports = router;
