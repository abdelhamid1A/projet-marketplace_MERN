const router = require("express").Router();
const sellerController = require("../controllers/sellerController");

const verify = require("../middleware/verficationSeller");

router.post("/", sellerController.sellerRegister);
router.get("/sellers/:status", sellerController.getAllSellers);
router.get("/findSeller", sellerController.findSeller);
router.get("/types", sellerController.getTypes);
router.patch("/update", verify, sellerController.resetPassword);
router.post("/login", sellerController.sellerLogin);
router.patch("/valid", sellerController.validSeller);
router.patch("/upgrade/:id", sellerController.sellerPack);
router.patch("/suspend", sellerController.sellerSuspend);
router.get("/count", sellerController.productCount);
router.patch("/upgrade/:id", sellerController.turnOverUpdated);
router.patch("/updateTurnOver/:id", sellerController.updateTurnOver);


module.exports = router;
