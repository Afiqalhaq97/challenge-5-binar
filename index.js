//define master of variabel
const express = require("express")

const app = express()
const port = 8081

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));// acess all public folder

//middleware 
// built in middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//middleware
const router = require('./routing/router')
app.use(router);

//routing
//root page
app.get('/', (req,res) => { 
    res.render('index'); //use for render file: 'view/index.ejs'
});

//erorr routing 
app.use(function(err,req,res,next){ 
    console.error(err)
    res.status(500).json({
        status:'fail',
        erorr:err.message
    }) 
})

// 404 handler
app.use(function(req,res){
    res.status(404);
    res.render('404'); //use for render file: 'view/index.ejs'
})

//create server start 
app.listen(port, () => {
    console.log(`server tun on = http://localhost:${port}`);
});