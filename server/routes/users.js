const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer')
const userOptVerification = require('../models/userOtpVerification')


let transport = nodemailer.createTransport({
    host:"smtp-relay.brevo.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.USER,
        pass:process.env.PASS
    }
})

const sendEmailVerification = async ({userId,email},res)=>{
    try {
         const otp = `${Math.floor(1000 + Math.random()*9000)}`;
         const mailOption = {
             from:process.env.USER,
             to:email,
             subject:"Verify Your Email",
             html:`<p>enter your ${otp} to verify your account</P>
             <p>expires in one hour</p>
             `
         }
         const hashOtp  = await bcrypt.hash(otp,10);
         const optUser = await userOptVerification.create({
                userId,
                otp:hashOtp,
                createdAt:Date.now(),
                expiresAt:Date.now() + 3600000
         })
         await optUser.save();
         await transport.sendMail(mailOption)
         res.json({
            msg:"plz check your mail for email verification",
            data:{
                userId,
                email
            }
         })
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
}

router.post("/", async(req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const response = await new User({...req.body, password: hashPassword }).save();
        const Id = response._id;
        const userId = Id.toString();
        const email = response.email;
        console.log(userId);
        await sendEmailVerification({userId,email},res);
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/:id", async(req, res) => {
    try {
        let data = await User.findById(req.params.id)
        res.status(200).json({ data: data })
    } catch (error) {
        res.status(500).json({ msg: "internal server error" })
    }
})

router.post('/verifyOtp', async (req, res) => {
    try {
        let { userId, otp } = req.body;
        if (!userId || !otp) {
            return res.json({ msg: "Empty userId or otp" });
        }

        const userOtpVeri = await userOptVerification.findOne({ userId });
        if (!userOtpVeri) {
            console.log("No OTP verification data found for the user with ID:", userId);
            throw new Error("No OTP verification data found for the user");
        }

        const { expiresAt, otp: hashOtp } = userOtpVeri;

        if (expiresAt < Date.now()) {
            await userOptVerification.deleteOne({ userId });
            throw new Error("OTP has already expired");
        }

        const response = await bcrypt.compare(otp, hashOtp);
        if (!response) {
            throw new Error("Invalid OTP, try resending again");
        }

        await User.updateOne({ _id: userId }, { isVerified: true });
        await userOptVerification.deleteOne({ userId });

        return res.json({ msg: "User has been verified successfully" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});


router.post('/resendOtp',async (req,res)=>{
       try {
          const {userId,email} = req.body;
          if(!userId || !email){
            res.json({msg:"user details are not given try it again!!!"})
          }else{
             await userOptVerification.deleteMany({userId});
             sendEmailVerification({userId,email},res);
          }
       } catch (error) {
           res.send({msg:error.message})
       }
})

module.exports = router;