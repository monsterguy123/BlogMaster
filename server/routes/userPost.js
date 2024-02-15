const router = require("express").Router();
const { Post, validate } = require('../models/Post.js')
const { User } = require('../models/user.js')

router.post("/", async(req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) {
            return res.status(401).json({ msg: error.details[0].message })
        }

        const existingUser = await User.findById(req.body.user)
   
        if (!existingUser) {
            return res.status(402).json({ msg: "user not exists" })
        }

        let data = await new Post(req.body);

        if (existingUser._id === req.body.user) {
            existingUser.blogs.push(data)
            await existingUser.save()
        }
        await data.save()

        return res.status(201).send({ message: "Post created successfully" });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error });
    }
});



router.get('/:id', async(req, res) => {
    try {
        let data = await Post.find({ user: req.params.id })
        res.status(202).json({ status: "ok", data: data })
    } catch (error) {
        console.log(error)
    }
})

router.get('/', async(req, res) => {
    try {
        let data = await Post.find({})
        res.status(202).json({ status: "ok", data: data })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;