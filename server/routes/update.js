const router = require("express").Router()
const { Post } = require('../models/Post')


router.put("/", async(req, res) => {

    try {
        const fd = req.body.userid;
        const user = await Post.findById(fd)
        if (!user) {
            res.status(401).json({ msg: "user is not recognized" })
        }

        await Post.findByIdAndUpdate(fd, {
            $set: req.body.data
        })
        res.status(202).json({ msg: "successsfully updated!!!" })

    } catch (e) {
        res.status(500).json({ msg: "internal server error" })
    }
})



module.exports = router