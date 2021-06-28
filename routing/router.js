const express = require('express')
const router = express()
let alert = require('alert');  

router.get("/login", (req, res) => {
    res.render("login");
    //next(); // -> jika tidak dilakukan fungsi next maka akan berhenti disini. 
});

router.get("/register", (req, res) => {
    res.render("register");
    //alert("WRONG USERNAME AND PASSWORD")
    //res.send("alert("your alert message"); window.location.href = "/page_location";");
    //next(); // -> jika tidak dilakukan fungsi next maka akan berhenti disini. 
});


router.get("/games", (req, res) => {
    const name = req.query.name || 'PLAYER 1'
    res.render('games', {
        name
    })
});

router.get("/about", (req, res, next) => {
    res.send("About");
    next(); // -> jika tidak dilakukan fungsi next maka akan berhenti disini. 
});

module.exports = router;