const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    }
})

router.get("/", campaignController.index);
router.get("/getAllCampaigns", campaignController.getAllCampaign);
router.get("/getCampaignById", campaignController.getCampaignById);
router.get("/getCampaignByCategory", campaignController.getCampaignByCategory);
router.get("/getCampaignByStatus", campaignController.getCampaignByStatus);
router.post("/createCampaign",campaignController.createCampaign);
router.delete("/deleteCampaignById", campaignController.deleteCampaignById);
router.post("/updateStatusById",campaignController.changeStatusById);
router.post("/updateTargetById",campaignController.updateTargetById);

module.exports = router;