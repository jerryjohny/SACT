const morgan = require('morgan');
const express = require('express');
const app= express();
const rota_produtos = require('./api/routs/products');
const rota_ordens = require('./api/routs/orders');
const rota_usuarios= require('./api/routs/Users');
const rota_contas= require('./api/routs/accounts')
const rota_fundos=require('./api/routs/fund')
const rota_empreendimento = require('./api/routs/estate')
const rota_cota =  require('./api/routs/quota')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//conexão com mongodb 
mongoose.connect('mongodb+srv://jerry:'+process.env.password+'@funds.j0vmf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
);
//controlador de logs
app.use(morgan('dev'));
//body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Headers para prevenção de CORS errors
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Controll-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept, Authorization");
    
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT','POST','PATCH','DELETE','GET');
     return res.status(200).json({});
    }
    next();
});
//rotas concretas
app.use('/products',rota_produtos);
app.use('/orders',rota_ordens);
app.use('/users',rota_usuarios);
app.use('/accounts',rota_contas);
app.use('/funds',rota_fundos)
app.use('/estate',rota_empreendimento)
app.use('/quota',rota_cota)
//rota fall-back
app.use((req,res,next)=>{
    const error = new Error('Not ound');
    error.status= 404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            nome: "jerry"
        }
    });
})


module.exports=app;