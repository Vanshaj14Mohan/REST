const express = require("express");
const app = express();
const port = 8080;

const path = require("path");

const { v4: uuidv4 } = require('uuid'); //using version 4 and naming it uuidv4
// uuidv4(); Generate unique id's.

app.use(express.urlencoded({extended: true}));

app.set("viw engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        // id: "1a",
        id: uuidv4(),
        username: "Thomas Shelby",
        content: "I love to work"
    },
    {
        // id: "2b",
        id: uuidv4(),
        username: "Arthur Shelby",
        content: "I love swimming"
    },
    {
        // id: "3c",
        id: uuidv4(),
        username: "John Shelby",
        content: "I love to play golf"
    },
];

app.get("/", (req,res)=>{
    res.send("Server is working well");
});

app.get("/posts", (req,res)=>{
    // res.send("Post request received");
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req,res)=>{
    // console.log(req.body);
    let {username, content} = req.body; //doing desturcturing. gathering username and content.
    posts.push({username, content}); //posts being the array we used earlier.
    // res.send("Post request received");
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res)=>{
    let {id} = req.params; //id retrieve
    // console.log(id);
    let post = posts.find((p) => id === p.id); //find the post with the id where p = posts
    // console.log(post);
    // res.send("request working");
    res.render("show.ejs", {post});
});

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
});