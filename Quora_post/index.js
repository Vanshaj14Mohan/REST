const express =require("express");
const app = express();
const port =8080;
const path =require("path");
const { v4: uuidv4 } = require('uuid'); //using uuid to generate unique id for each note
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 

app.use(express.static(path.join(__dirname, "public"))); 

let posts = [
    {
        id: uuidv4(),
        username: "Artur",
        content: "I love coding!"
    },
    {
        id: uuidv4(),
        username:"Matthew",
        content: "I love cooking"
    },
    {
        id: uuidv4(),
        username: "Rose",
        content: "I love reading"
    },
    {
        id: uuidv4(),
        username: "Linda",
        content: "I got my first internship"
    },
    {
        id: uuidv4(),
        username: "Victor",
        content: "I love python"
    },
];

// app.get("/", (req, res) =>{
//     res.send("server working well!");
// })

app.get("/posts", (req, res) =>{
    res.render("index.ejs", {posts});
});


app.get("/posts/new", (req, res) =>{
    res.render("new.ejs");
});

//In get request info comes in it's parameters that's why req.params
//But in post request info comes in the body of the request that's why req.body
app.post("/posts", (req, res) =>{
let {username, content} =req.body;
let id = uuidv4();
posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) =>{
let {id} =req.params;
console.log(id);
let post =posts.find((p) => id === p.id);
  if (!post) {
        // You can render a 404 page or send a message
        return res.status(404).send("Post not found");
    }
res.render("show.ejs", {post});
}); 

app.patch("/posts/:id", (req, res)=>{
    let {id} =req.params; //requiring id
    let newContent = req.body.content;
    let post =posts.find((p) => id === p.id);
    post.content= newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res)=>{
    let {id} =req.params;
    let post =posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res)=>{
    let {id} =req.params;
     posts =posts.filter((p) => id !== p.id); //woh post filter karega jaha condition true hogi
     res.redirect("/posts");
});

app.listen(port, ()=>{
    console.log("listening to port: 8080");
});