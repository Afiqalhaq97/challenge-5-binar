const express = require('express')
const router = express.Router()


router.get("/login", (req,res) => {
    res.render("login");
    //next(); // -> jika tidak dilakukan fungsi next maka akan berhenti disini. 
});

router.get("/about", (req,res, next) => {
    res.send("About");
    next(); // -> jika tidak dilakukan fungsi next maka akan berhenti disini. 
});

module.exports = router;