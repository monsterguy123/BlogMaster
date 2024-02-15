const mongoose = require("mongoose");
const Joi = require('joi')

const PostSchema = new mongoose.Schema({
    image: { type: String, default: "https://imgs.search.brave.com/yAcnzKhMMjGKoyuvuhYQgu8GDLj80dC7iWgHO7fven0/rs:fit:1000:1000:1/g:ce/aHR0cHM6Ly9tb29u/dmlsbGFnZWFzc29j/aWF0aW9uLm9yZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxOC8w/Ni9kZWZhdWx0LXBy/b2ZpbGUtcGljdHVy/ZTEuanBn" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    PostedBy: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    categories: { type: String, default: "all" }
});
const validate = (data) => {
    const schema = Joi.object({
        image: Joi.string().label("image"),
        title: Joi.string().required().label("title"),
        description: Joi.string().required().label("discription"),
        PostedBy: Joi.string().required().label("PostedBy"),
        user: Joi.string().required().label("user"),
        categories: Joi.string().label("categoary")
    });
    return schema.validate(data);
};

const Post = mongoose.model("userPost", PostSchema);


module.exports = { Post, validate };