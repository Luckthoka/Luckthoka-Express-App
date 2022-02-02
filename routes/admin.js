const path = require("path");
const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

//admin/add-pool => POST
router.post("/add-pool", adminController.postAddPool);

//admin/add-mini-pool => POST
router.post("/add-mini-pool", adminController.postAddMiniPool);

//admin/update-page-content => POST
router.post("/update-page-content", adminController.updatePageContent);

//admin/update-winner => POST
router.post("/update-winner", adminController.updateWinner);

// // /admin/getPools => GET
router.get("/get-pools", adminController.getPools);

// // /admin/getMiniPools => GET
router.get("/get-mini-pools", adminController.getMiniPools);

// // /admin/getLatestPools => GET
router.get("/get-latest-pool", adminController.getLatestPool);

// // /admin/getLatestMiniPools => GET
router.get("/get-latest-mini-pool", adminController.getLatestMiniPool);

// // /admin/getActiveMiniPools => GET
router.get("/get-active-mini-pools", adminController.getActiveMiniPools);

// // /admin/getPageContent => GET
router.get("/get-page-content", adminController.getPageContent);

module.exports = router;
