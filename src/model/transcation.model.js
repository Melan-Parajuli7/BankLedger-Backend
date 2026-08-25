const mongoose = require('mongoose')

const transcationSchema = new mongoose.Schema({
    fromAccount:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "account",
       required: [true, 'Transcation must be associated with a from account'],
       index : true
    }, 
    toAccount:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "account",
       required: [true, 'Transcation must be associated with a to account'],
       index : true        
    },
    status: {
        type: String,
        enum: {
            values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
            message: "Status can be either PENDING , COMPLETED , FAILED or REVERSED"
        } ,
        default: "PENDING"
    }, 
    amount: {
        type: Number,
        required: [true , "Amount is required for creating a transcation"],
        min: [0, "Transcation amount has to be higher than 0"]   
    },
    idempotencyKey: {
        type: String, 
        required: [true, 'Idempotency Key is Required for Transcation'],
        index: true,
        unique: true
    }
},{
    timestamps: true
})

const transcationModel = mongoose.model('transcation', transcationSchema);


module.exports = transcationModel;