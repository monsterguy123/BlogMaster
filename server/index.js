require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postRoutes = require('./routes/userPost')
const idRoute = require('./routes/View')
const UpdateRoute = require('./routes/update')
const CommentRoute = require('./routes/comment')

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/userpost", postRoutes);
app.use("/api/id", idRoute)
app.use("/api/userpost/update", UpdateRoute)
app.use("/api/userpost/comment", CommentRoute)




const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));