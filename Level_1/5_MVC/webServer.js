const express = require("express");
const app = express();
const path =require("path");
const cors = require("cors");
const PORT = process.env.PORT || 3500;

const corsOptions = require("./config/corsOption");
const { logger } = require("./middleware/logevents");
const errorHandler = require("./middleware/errorHandler");



app.use(logger);
app.use(cors(corsOptions));

app.use(express.urlencoded( {extended : false} )); 
app.use(express.json());

app.use("/" , require("./routes/mainroutes"));
app.use("/" , express.static(path.join(__dirname , "./public")));

app.use("/subdir" , require("./routes/subroutes"));
app.use("/subdir" , express.static(path.join(__dirname , "./public")));

app.use("/api" , require("./routes/apiRoutes"));

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