const express = require("express");
const userMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controller/account.controller");

const router = express.Router();

/*
 * - POST /api/accounts/
 * - Create a new Account
 * - Protected Routes
 */

router.post(
  "/",
  userMiddleware.userMiddleware,
  accountController.createAccountController,
);

router.get('/',  userMiddleware.userMiddleware, accountController.getUserAccountsController);

// /balance/:accountId
router.get('/balance/:accountId', userMiddleware.userMiddleware, accountController.getAccountBalanceController )
module.exports = router;
