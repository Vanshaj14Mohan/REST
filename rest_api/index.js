const express = require("express");
const app = express();

const port = 8080;

const path = require("path");


app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
});