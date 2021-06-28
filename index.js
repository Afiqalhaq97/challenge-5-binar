//define master of variabel
const express = require("express")

const app = express()
const fs = require("fs")
const port = 8081

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));// acess all public folder

//middleware 
// built in middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//middleware
const router = require('./routing/router')
const users = require("./data/user.json")

app.use(router);

//routing
//root page
app.get('/', (req, res) => {
    res.render('index'); //use for render file: 'view/index.ejs'
});

//erorr routing 
app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500).json({
        status: 'fail',
        erorr: err.message
    })
})

//api 
//read all data 
app.get('/api/v1/user', (req, res) => {
    res.status(200).json(users)
})

//api get data by id
app.get('/api/v1/user/:id', (req, res) => {
    const user = users.find(i => i.id == req.params.id)
    if (user) {
        res.status(200).json(user)
    } else {
        res.send("NO DATA FOUND")
    }
})

//post data
app.get('api/v1/user/post', (req, res) => {
    const { username, password, fullname, email } = req.body
    //Get last of ID
    const id = users[users.length - 1].id + 1
    const userNew = {
        id, username, password, fullname, email
    }
    //save on users json 
    users.push(userNew)
    //show the user input parameter
    res.status(201).json(userNew)
})

// 404 handler
app.use(function (req, res) {
    res.status(404);
    res.render('404');
})

//create server start 
app.listen(port, '0.0.0.0', () => {
    console.log(`server run on = http://localhost:${port}`);
});