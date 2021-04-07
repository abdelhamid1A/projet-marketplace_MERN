const Ads = require("../models/Ads");

class adsController {

    async getAllAds  (req, res, next)  {
      try {
        const ads = await Ads.find();
        res.json(ads);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
    
    async adsRegister  (req, res, next)  {
      const ads = new Ads({
        picture:req.file.filename,
        pricing:req.body.pricing,
        startDate:req.body.startDate,
        endDate:req.body.endDate
      });
    
      try {
        const savedAd = await ads.save();
        res.status(201).send(savedAd);
      } catch (error) {
        res.status(400).send({ message: error.message });
      }
    };
    
    async adsDelete  (req, res, next)  {
      try {
        const adsdeleted = await Ads.deleteOne({ _id: req.body.id });
        res.status(202).send("ads deleted");
      } catch (error) {
        res.status(400).send({ message: error.message });
      }
    };
}

module.exports = new adsController()
