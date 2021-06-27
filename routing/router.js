const express = require('express')
const router = express.Router()

router.use(function timelog (req,res,next){
    console.log('Time', Date.now())
    next()
})

router.get("/about", (req,res, next) => {
    res.send("About");
    next(); // -> jika tidak dilakukan fungsi next maka akan berhenti disini. 
});

module.exports = router;