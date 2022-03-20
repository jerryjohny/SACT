const fundsModel= require('../models/fund')
const mongoose = require('mongoose');

exports.create_new_fund=(req,res,next)=>{
    const fund = new fundsModel({
        _id: new mongoose.Types.ObjectId(),
        description:      req.body.description,
        creation_date: Date.now()
    });
    fund
    .save()
    .then(result=>{
        console.log(result);
        res.status(200).json({ 
            message: "You have created a new fund" ,
            produto_criado: {
                description: result.description,
                creation_date: result.creation_date,
                GET_URL: 'http://localhost:4000/funds/'+result._id
            }
        });
    })
    .catch(err=>{
        res.status(500).json({
          dic: "estes campos sao fortemente validados insira o tipo de dado correcto e garanta a inclusao de todos campos",
          erro:err  
        })
    });
}