const express = require("express");
const app = express();
const path =require("path");
const PORT = process.env.PORT || 3500;

// app.get("/" , (req , res) => {
//     res.sendFile(path.join(__dirname , "views" , "index.html"));
// });
app.get("^/$|/index(.html)?" , (req , res) => {
    res.sendFile(path.join(__dirname , "views" , "index.html"));
});

app.get("/new-page(.html)?" , (req , res) => {
    res.sendFile(path.join(__dirname , "views" , "newPage.html"));
});

app.get("/old-page(.html)?", (req, res) => {
    res.redirect(301, "new-Page.html"); // Correct the redirection path
});

app.get("/hello(.html)?" , (req , res , next) => {
    console.log("loding Hello file!");
    next();
} , (req , res) => {
    res.send("This is next using.")
});

app.get("/*" , (req , res) => {
    res.status(404).sendFile(path.join(__dirname , "views" , "404.html"));
});




app.listen(PORT , () => {
    console.log(`Server Running On Port ${PORT}`);
});