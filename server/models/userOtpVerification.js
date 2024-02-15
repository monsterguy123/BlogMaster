const { string } = require('joi')
const mongoose = require('mongoose')

const userOtpVerificationSchema = new mongoose.Schema({
    userId:{type: mongoose.Types.ObjectId, ref: 'user'},
    otp:String,
    createdAt:Date,
    expiresAt:Date
})

const userOtpVerification = mongoose.model("userOtpVerification",userOtpVerificationSchema);

module.exports = userOtpVerification;