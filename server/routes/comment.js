const express = require('express')
const Comment = require('../models/Comment')
const { User } = require('../models/user')
const router = express.Router()


router.post('/com', async (req, res) => {
    console.log("hello i am here")
    console.log(req.body);
    try {
        const user = await User.findById(req.body.user);
        if(!user){
            res.json({msg:"user doesnt exist"})
        }
        const commentData = {
            ...req.body,
            name: `${user.firstName} ${user.lastName}`,
            image: user.image
        };
        const newComment = await Comment.create(commentData);
        console.log(newComment);
        res.status(201).json({ msg: "Comment posted", comment: newComment });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ msg: "Internal server error", error });
    }
});

router.delete('/:id', async(req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:"deleted"})
    } catch (error) {
        res.status(500).json({ msg: "internal server error" })
    }
})

module.exports = router;