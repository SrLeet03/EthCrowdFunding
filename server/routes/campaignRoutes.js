const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

router.get("/", campaignController.index);
router.get("/getAllCampaigns", campaignController.getAllCampaign);
router.get("/getCampaignById", campaignController.getCampaignById);
router.get("/getCampaignByCategory", campaignController.getCampaignByCategory);
router.post("/createCampaign", campaignController.createCampaign);
router.delete("/deleteCampaignById", campaignController.deleteCampaignById);







// GET request to delete Book.
// router.get("/book/:id/delete", campaignController.book_delete_get);

// // POST request to delete Book.
// router.post("/book/:id/delete", campaignController.book_delete_post);

// // GET request to update Book.
// router.get("/book/:id/update", campaignController.book_update_get);

// // POST request to update Book.
// router.post("/book/:id/update", campaignController.book_update_post);

// GET request for one Book.


// GET request for list of all Book items.


module.exports = router;