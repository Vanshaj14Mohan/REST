const express = require("express");
const app = express();
const port = 8080;

const path = require("path");

app.use(express.urlencoded({extended: true}));

app.set("viw engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        username: "Thomas Shelby",
        content: "I love to work"
    },
    {
        username: "Arthur Shelby",
        content: "I love swimming"
    },
    {
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
    let {username, content} = req.body; //doing desturcturing.
    posts.push({username, content}); //posts being the array we used earlier.
    // res.send("Post request received");
    res.redirect("/posts");
});

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
});