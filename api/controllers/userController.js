const mongoose = require('mongoose');//biblioteca para lidar com mongoDB
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');//boiblioteca para  criptografar a password
const jwt = require('jsonwebtoken')

exports.signup=(req,res,next)=>{
    userModel.find({email: req.body.email}).exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message: "email já existe na abase de dados"
            })
        }else{
            bcrypt.hash(req.body.password, 10,(err,hash)=>{

                if(err){
                    return res.status(500).json({ 
                        error:err
                    })
                }else{
                    const user = new userModel({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        phone: req.body.phone,
                        email: req.body.email,
                        password: hash
                    }); 
                    user
                    .save()
                    .then(result=>{
                        console.log(result);
                        res.status(200).json({ 
                            message: "Novo usuario" ,
                            produto_criado: {
                                id: result._id,
                                name: result.name,
                                phone: result.phone,
                                email: result.email,
                                password: result.password,
                                GET_URL: 'http://localhost:4000/users/'+result._id
                            }
                        });
                    })
                    .catch(err=>{
                        res.status(500).json({
                        hint: "estes campos sao fortemente validados insira o tipo de dado correcto e garanta a inclusao de todos campos",
                        erro:err  
                        })
                    }); 
                 }
            })
        }
    })
}

exports.login=(req,res,next)=>{

    userModel.find({email: req.body.email})
    .exec()
    .then(user=> {

        if(user.length < 1){
            res.status(401).json({
                message: "autenticação falhou"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message: "autenticação falhou2"
                })
            }
            if(result){
                const token= jwt.sign(
                    {
                      email: user[0].email,
                      userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    } 
                );
               return res.status(200).json({
                   message: "sucesso",
                   token:token
               })
            }
   
            return res.status(401).json({
               message: "autenticação falhou3"
           })
        }); 
        
    })
    .catch(err=>{console.log("erro generico")})
}

exports.get_all_users=(req,res,next)=>{
    userModel.find()
    .select('name phone email password')
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            usr: doc.map(doc=>{
                return{
                    id: doc._id,
                    name: doc.name,
                    phone: doc.phone,
                    email: doc.email,
                    password: doc.password,
                    SPECIFIC_GET_URL: 'http://localhost:4000/users/'+doc._id
                }
            })
        }
       console.log("da base de dados",doc) ;
       //res.status(200).json(resposta.usr);
       res.status(200).json(resposta);
       
    })
    .catch(err=>{ 
        console.log(err);
        res.status(500).json({error:err});
    });
}

exports.delete_user=(req,res,next)=>{
    
    userModel.remove({phone:req.params.phone})
    .exec()
    .then( result=> {
            res.status(200).json({
                message : "deleted",
                result: result
            })
        }
    )
    .catch(err=>{
        res.status(500).json({
            message: "Ocorreu algum erro",
            erro: err
        })
    })
    
}