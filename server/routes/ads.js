const router = require("express").Router();
const {upload} = require('../config/upload')

const adsController = require("../controllers/adsController");

router.get("/",adsController.getAllAds);
router.post('/',upload.single('picture'),adsController.adsRegister);
router.delete("/",adsController.adsDelete);

module.exports = router;
