const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: { type: String },
    date: { type: String },
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    post: { type: mongoose.Types.ObjectId, ref: "userPost", required: true },
    name: { type: String },
    image: { type: String }
});

const Comment = mongoose.model("comment", CommentSchema)

module.exports = Comment