const path = require("path");
const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.post("/add-user-pool", userController.addUserToPool);
router.post("/get-user-with-wallet-id", userController.getUserWithWalletId);

module.exports = router;
