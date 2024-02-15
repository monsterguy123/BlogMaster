const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    blogs: [{ type: mongoose.Types.ObjectId, ref: 'userBlog' }, ],
    image: { type: String, default: "https://imgs.search.brave.com/iJsGc36Dvup3Xt9XqXfGldX_4nvHuJUngP2-mGp1rsY/rs:fit:300:300:1/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vcmVzZWFy/Y2hpY3RhZnJpY2Eu/bmV0L3dwL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE2LzEwL2Rl/ZmF1bHQtcHJvZmls/ZS1waWMuanBnP3Nz/bD0x" }
    ,isVerified:{type:Boolean,default:false}
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });

    return { token, _id: this._id };
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        image: Joi.string().label("image")
        , token:Joi.string().optional()
    });
    return schema.validate(data);
};

module.exports = { User, validate };