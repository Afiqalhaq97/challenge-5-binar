const express = require('express')
const router = express()

router.get("/login", (req, res) => {
    res.render("login");
    //next(); // -> jika tidak dilakukan fungsi next maka akan berhenti disini. 
});

router.post("/login", (req, res) => {
    res.redirect('/games')
});

router.get("/register", (req, res) => {
    res.render("register");
    //next(); // -> jika tidak dilakukan fungsi next maka akan berhenti disini. 
});


router.get("/games", (req, res) => {
    res.render("games");
});

router.get("/about", (req, res, next) => {
    res.send("About");
    next(); // -> jika tidak dilakukan fungsi next maka akan berhenti disini. 
});

module.exports = router;