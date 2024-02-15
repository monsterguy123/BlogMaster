const router = require("express").Router()
const { Post } = require('../models/Post')
const Comment = require('../models/Comment')

router.post("/", async(req, res) => {
    try {
        const fd = req.body.id;
        const data = await Post.findById(fd)
        res.status(201).json({ data: data })
    } catch (e) {
        res.status(500).json({ msg: "internal server error" })
    }
})

router.put('/', async(req, res) => {
    try {
        const user = await Post.findById(req.body.userid)
        if (!user) {
            res.status(401).json({ msg: "user is not recognized" })
        }
        await Post.findByIdAndDelete(req.body.userid)
        res.status(201).json({ msg: "Successfully deleted!!!" })
    } catch (error) {
        res.status(500).json({ msg: "internal server error" })
    }
})

router.get('/:id', async(req, res) => {
    try {
        const data = await Comment.find({ post: req.params.id })
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router