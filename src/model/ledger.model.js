const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
    required: [true, "Ledger must be associated with an account"],
    index: true,
    immutable: true,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required for creating a Ledger"],
    immutable: true,
  },
  transcation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "transcation",
    required: [true, "Ledger must be assocaited with a Transcation"],
    index: true,
    immutable: true,
  },
  type: {
    type: String,
    enum: {
      values: ["CREDIT", "DEBIT"],
      message: "Type can be either CREDIT or DEBIT",
    },
    required: true,
    immutable: true,
  },
});

function preventLedgerModification() {
  throw new Error("Ledger Entries cannot be modified or deleted");
}

ledgerSchema.pre("findOneAndUpdate", preventLedgerModification);
ledgerSchema.pre("updateOne", preventLedgerModification);
ledgerSchema.pre("deleteOne", preventLedgerModification);
ledgerSchema.pre("remove", preventLedgerModification);
ledgerSchema.pre("deleteMany", preventLedgerModification);
ledgerSchema.pre("findOneAndReplace", preventLedgerModification);
ledgerSchema.pre("updateMany", preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);

const ledgerModel = mongoose.model('ledger', ledgerSchema)

module.exports = ledgerModel;
