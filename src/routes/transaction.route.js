const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const transactionController = require("../controller/transaction.controller");

const router = express.Router();

/**
 * Post  /api/transaction
 */

router.post(
  "/",
  authMiddleware.userMiddleware,
  transactionController.createTransaction,
);



/**
 * POST /api/transcation/system/intial-funds
 * Create intial funds transcation for system user
 */

router.post(
    "/system/initial-funds",
    authMiddleware.authSystemUserMiddleware,
    transactionController.createInitialFundsTransaction

)



module.exports = router;
