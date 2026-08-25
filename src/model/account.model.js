const mongoose = require("mongoose");
const ledgerModel = require("../model/ledger.model");

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Account must associated with a user"],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ACTIVE", "FROZED", "CLOSED"],
        message: "Status can be either active, frozed or closed",
      },
      default: "ACTIVE",
    },
    currency: {
      type: String,
      required: [true, "Currency is required while creating an account"],
      default: "NPR",
    },
  },
  {
    timestamps: true,
  },
);

accountSchema.index({ user: 1, status: 1 }); // compound index

accountSchema.methods.getBalance = async function () {

  const balanceData = await ledgerModel.aggregate([
    { $match: { account: this._id } },
    {
      $group: {
        _id: null,
        totalDebit: {
          $sum: {
            $cond: [{ $eq: ["$type", "DEBIT"] }, "$amount", 0],
          },
        },
        totalCredit: {
          $sum: {
            $cond: [{ $eq: ["$type", "CREDIT"] }, "$amount", 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        balance: { $subtract: ["$totalCredit", "$totalDebit"] },
      },
    },
  ]);

  if(balanceData.length === 0){
    return 0
  }

  return balanceData[0].balance
};

const accountModel = mongoose.model("account", accountSchema);

module.exports = accountModel;
