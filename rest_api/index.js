const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4();

app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")))

let posts = [
    {
        id: uuidv4(),
        username: "Thomas Shelby",
        content: "I love to work"
    },
    {
        id: uuidv4(),
        username: "Arthur Shelby",
        content: "I love swimming"
    },
    {
        id: uuidv4(),
        username: "John Shelby",
        content: "I love to play golf"
    },
];

app.get("/", (req,res)=>{
    res.send("Server working well");
});

app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});

//In get request info comes in it's parameters that's why req.params
//But in post request info comes in the body of the request that's why req.body
app.post("/posts", (req,res)=>{
    // console.log(req.body);
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    // res.send("Post request working");
    res.redirect("/posts"); //by default it will send get request only
});

app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    // res.send("Id checked");
     if (!post) {
        // You can render a 404 page or send a message
        return res.status(404).send("Post not found");
    }
    res.render("show.ejs", {post});
});

// app.patch("/posts/:id", (req,res)=>{
//     let {id} = req.params;
//     let newContent = req.body.content;
//     let post = posts.find((p) => id === p.id);
//     post.content = newContent;
//     console.log(post);
//     res.send("Patch request working");
// });

app.listen(port, (req,res)=>{
    console.log(`App is listening on port ${port}`);
});
