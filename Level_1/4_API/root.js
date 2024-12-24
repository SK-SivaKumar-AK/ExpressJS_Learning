const express = require('express');
const router = express.Router();
const path =require("path");

// router.get("/" , (req , res) => {
//     res.sendFile(path.join(__dirname , "views" , "index.html"));
// });
router.get("^/$|/index(.html)?" , (req , res) => {
    res.sendFile(path.join(__dirname , "views" , "index.html"));
});

router.get("/new-page(.html)?" , (req , res) => {
    res.sendFile(path.join(__dirname , "views" , "newPage.html"));
});

router.get("/old-page(.html)?", (req, res) => {
    res.redirect(301, "new-Page.html"); // Correct the redirection path
});


module.exports = router;