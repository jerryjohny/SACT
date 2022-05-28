const mongoose = require('mongoose');//biblioteca para lidar com mongoDB
const trabalhadorModel = require('../models/trabalhadorModel')
const bcrypt = require('bcrypt');//boiblioteca para  criptografar a password
const jwt = require('jsonwebtoken')

exports.registarTrabalhador=(req,res,next)=>{
    trabalhadorModel.find({BI: req.body.BI}).exec()
    .then(trabalhador=>{
                            if(trabalhador.length>=1){
                                return res.status(409).json({
                                    message: "Este BI já existe na abase de dados"
                                })
                            }else{
                                    const trabalhador = new trabalhadorModel({
                                        _id: new mongoose.Types.ObjectId(),
                                        nome:              req.body.nome,
                                        telefone:          req.body.telefone,
                                        morada:            req.body.morada,
                                        BI:                req.body.BI,
                                        especialidade:     req.body.especialidade,
                                        tipo_trabalhador:   req.body.tipo_trabalhador,
                                        nivel_experiencia: req.body.nivel_experiencia,
                                        link_cv:           req.body.link_cv
                                    }); 
                                    trabalhador
                                    .save()
                                    .then(result=>{
                                        console.log(result);
                                        res.status(200).json({ 
                                            message: "Novo trabalhador registado" ,
                                            trabalhador: {
                                                id:    result._id,
                                                nome:  result.nome,
                                                telefone: result.telefone,
                                                BI: result.BI,
                                                especialidade: result.especialidade,
                                                GET_URL: 'http://localhost:3000/trabalhador/'+result._id
                                            }
                                        });
                                    })
                                    .catch(err=>{
                                        res.status(500).json({
                                        hint: "Estes campos sao fortemente validados insira o tipo de dado correcto e garanta a inclusao de todos campos",
                                        erro:err  
                                        })
                                    }); 
                            }
                        }
    ) 
   
}
exports.listarTrabalhadores=(req,res,next)=>{
    trabalhadorModel.find()
    .select('nome telefone BI especialidade ')
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            usr: doc.map(doc=>{
                return{
                    id: doc._id,
                    nome: doc.nome,
                    telefone: doc.telefone,
                    BI: doc.BI,
                    especialidade: doc.especialidade,
                    SPECIFIC_GET_URL: 'http://localhost:3000/trabalhador/'+doc._id
                }
            })
        }
       console.log("da base de dados",doc) ;
       //res.status(200).json(resposta.usr);
       res.status(200).json(resposta.usr);
       
    })
    .catch(err=>{ 
        console.log(err);
        res.status(500).json({error:err});
    });
}

exports.eliminarTrabalhador=(req,res,next)=>{
    
    trabalhadorModel.remove({BI:req.params.BI})
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