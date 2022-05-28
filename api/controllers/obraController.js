const obraModel= require('../models/obraModel');
const mongoose = require('mongoose');

exports.registarObra=(req,res,next)=>{
    const obra = new obraModel({
        _id: new mongoose.Types.ObjectId(),
        designacao:  req.body.designacao,
        detalhes:    req.body.detalhes,
        localizacao: req.body.localizacao,
        zelador:     req.body.zelador,
        inicio:      req.body.inicio,
        fim:         req.body.fim
    });
    obra
    .save()
    .then(result=>{
        console.log(result);
        res.status(200).json({ 
            message: "Nova obra" ,
            obra: {
                designacao: result.designacao,
                detalhes:      result.detalhes,
                zelador:    result.zelador,
                inicio:     result.inicio,
                fim:        result.fim,
                GET_URL: 'http://localhost:3000/obra/'+result._id
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
exports.listarObras=(req,res,next)=>{
    obraModel.find()
    .select('_id designacao detalhes localizacao inicio fim')
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            products: doc.map(doc=>{
                return{
                    designacao:  doc.designacao,
                    detalhes:    doc.detalhes,
                    localizacao: doc.localizacao,
                    inicio:      doc.inicio,
                    fim:         doc.fim,
                    _id:         doc._id,
                    SPECIFIC_GET_URL: 'http://localhost:3000/obras/'+doc._id
                }
            })
        }
       console.log("dabase de dados",doc) ;
       res.status(200).json(resposta.products);
    })
    .catch(err=>{ 
        console.log(err);
        res.status(500).json({error:err});
    });
}
exports.editarObra=(req,res,next)=>{
    const id = req.params.detId; 
    const updateOps={};

    for(const ops of req.body ){
       updateOps[ops.propName] = ops.value;
    }
    obraModel.update({_id: id},{$set:updateOps})
     .exec()
     .then(result=> {
            res.status(200).json({
                message: "Obra actualizada" ,
                produto_actualizado: {
                    designacao: result.designacao,
                    detalhes: result.detalhes,
                    GET_URL: 'http://localhost:3000/obras/'+id
                }
            })
        })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error:err})
      })
}
exports.eliminarObra=(req,res,next)=>{
    obraModel.remove({_id:req.params.id})
    .exec()
    .then( result=> {
            res.status(200).json({
                message : "Obra eliminada",
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