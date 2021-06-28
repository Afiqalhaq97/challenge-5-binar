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
var users = require("./data/user.json")

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
app.post('/api/v1/user/posts', (req, res) => {
    const { username, password, fullname, email } = req.body
    //Get last of ID
    const id = users[users.length - 1].id + 1
    const user = {
        id, username, password, fullname, email
    }
    users.push(user)
    console.log(users)
    
    users = JSON.stringify(users); // use for parsing const into json file 
    fs.writeFileSync("./data/user.json", users, "utf8"); // use for saving the json file.
    
    res.status(201).json(users)
})

//put data (digunakan untuk rubah data atau insert jika blm pernah ada)
app.put('/api/v1/user/:id', (req,res) => {
    let user = users.filter(i => i.id == req.params.id)
    //"username":"tiko","password":1234,"fullname":"tiko tiko","email":"tiko.pb@gmail.com"

    const params = { username: req.body.username, password: req.body.password, 
        fullname: req.body.fullname, email: req.body.email}
    user = {...user, ...params}
    //update 
    users = users.map(i => i.id == user.id ? user : i)
    res.status(200).json(user)
})

//delete data 
app.delete('/api/v1/post/:id', (req,res) => {
    users = users.filter(i => i.id != req.params.id)
    res.status(200).json({
        message: `post dengan id ${req.params.id} berhasil dihapus`
    })
});

//login validation
app.post("/login", (req, res) => {
    const { email, password }  = req.body
    for (var i = 0; i < users.length; i++){
        if(email == users[i].email && password == users[i].password){
            res.redirect(`/games?name=${users[i].username}`) // if user and password match than redirect into games area 
        }
    }
    // if not found then please study about alert! render
    res.render('login')
});

//register 
app.post('/register', (req,res) => {
    const {username, fullname, email, password} = req.body
    //get id 
    const id = users[users.length -1].id + 1
    const register = {
        id, username, password, fullname, email
    }
    users.push(register)
    console.log(users)
    
    users = JSON.stringify(users); // use for parsing into json file 
    fs.writeFileSync("./data/user.json", users, "utf8"); // use for saving the json file.
    res.render('login')
})

//erorr handling internal server erorr handler
app.use(function(err,req,res,next){ 
    console.error(err)
    res.status(500).json({
        status:'fail',
        erorr:err.message
    }) 
})

// 404 handler
app.use(function (req, res) {
    res.status(404);
    res.render('404');
})

//create server start 
app.listen(port, () => {
    console.log(`server run on = http://localhost:${port}`);
});