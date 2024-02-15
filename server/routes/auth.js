const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const JWT = require('jsonwebtoken')
const nodemailer = require('nodemailer')

let transport = nodemailer.createTransport({
    host:"smtp-relay.brevo.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.USER,
        pass:process.env.PASS
    }
})


router.post("/", async(req, res) => {
    try{
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
   
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" });
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)                                                                                                                                                                                                                                                                                                                                                                             
            return res.status(401).send({ message: "Invalid Email or Password" });

        const token = user.generateAuthToken();
        console.log(token)
        res.status(200).send({ data: token, message: "logged in successfully" });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.post('/forgetPassword', async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ msg: "User does not exist. Please try using a different email." });
        }
        
        const token = JWT.sign({ userId: user._id }, process.env.JWTPRIVATEKEY, { expiresIn: "1h" });
        

        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject: "Reset Password Link",
            html: `<p>Links to reset password</p>
                    <p> http://localhost:3001/login/${user._id}/${token}</p>
                    <p>Expires in one hour</p>`
        };
        
        let response = await transport.sendMail(mailOptions);
        if (response) {
            res.json({ msg: "Email has been sent to your respective email." });
        } else {
            res.json({ msg: "Please try again. Link couldn't be sent." });
        }

    } catch (error) {
        res.json({ msg: error.message });
    }
});

router.post('/resetpassword/:userId/:token', async (req, res) => {
    try {
        const { userId, token } = req.params;
        const { password } = req.body;

        if (!userId || !token || !password) {
            return res.status(400).json({ msg: "Missing parameters. Please provide userId, token, and password." });
        }

        const decoded = JWT.verify(token, process.env.JWTPRIVATEKEY);

        if (!decoded || decoded.userId !== userId) {
            return res.status(401).json({ msg: "Unauthorized. Invalid token or userId." });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(password, salt);
         console.log(hashPassword)
         let respo = await User.findByIdAndUpdate({ _id: userId },{password:hashPassword});
        if(respo.acknowledged){
            res.json({ msg: "Password has been updated successfully." });
        }else{
            res.json({msg:"password update failed!!!"})
        }
    } catch (error) {
        console.error("Error in resetPassword route:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;