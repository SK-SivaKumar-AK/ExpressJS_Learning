const express = require("express");
const app = express();
const path =require("path");
const PORT = process.env.PORT || 3500;
const { logger } = require("./logevents");
const errorHandler = require("./errorHandler");
const cors = require("cors");

app.use(logger);
const whiteList = ["https://www.google.com" , "http://127.0.0.1:5500" , "http://localhost:3500"];
const corsOptions = {
    origin : (origin , callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null , true);
        }else{
            callback(new Error("Not Allowed by CORS"));
        }
    },
    optionSuccessStatus: 200    
}
app.use(cors(corsOptions));

app.use(express.urlencoded( {extended : false} )); 
app.use(express.json());

app.use("/" , require("./root"));
app.use("/" , express.static(path.join(__dirname , "./public")));

app.use("/subdir" , require("./routes"));
app.use("/subdir" , express.static(path.join(__dirname , "./public")));

app.use("/api" , require("./apiRoutes"));

app.get("/hello(.html)?" , (req , res , next) => {
    console.log("loding Hello file!");
    next();
} , (req , res) => {
    res.send("This is next using.")
});

app.get("/*" , (req , res) => {
    res.status(404).sendFile(path.join(__dirname , "views" , "404.html"));
});



app.use(errorHandler);
app.listen(PORT , () => {
    console.log(`Server Running On Port ${PORT}`);
});