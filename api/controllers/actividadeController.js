const actividadeModel= require('../models/actividadeModel');
const mongoose = require('mongoose');


exports.registarActividade=(req,res,next)=>{
    const actividade = new actividadeModel({
        _id: new mongoose.Types.ObjectId(),
        designacao:    req.body.designacao,
        detalhes:      req.body.detalhes,
        inicio:        req.body.inicio,
        fim:           req.body.fim,
        horaInicio:    req.body.horaInicio,
        horaFim:       req.body.horaFim,
        obraAssociada: req.body.obraAssociada
    });
    actividade
    .save()
    .then(result=>{
        console.log(result);
        res.status(200).json({ 
            message: "Nova actividade" ,
            actividade: {
                designacao:    result.designacao,
                detalhes:      result.detalhes,
                inicio:        result.inicio,
                fim:           result.fim,
                horaInicio:    result.horaInicio,
                horaFim:       result.horaFim,
                obraAssociada: result.obraAssociada,
                GET_URL: 'http://localhost:3000/actividade/'+result._id
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
exports.listarActividades=(req,res,next)=>{
    actividadeModel.find()
    .select('_id designacao detalhes obraAssociada inicio fim horaInicio horaFim')
    .populate("obraAssociada horaInicio","designacao horaInicio")
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            products: doc.map(doc=>{
                return{
                    designacao:    doc.designacao,
                    detalhes:      doc.detalhes,
                    inicio:        doc.inicio,
                    fim:           doc.fim,
                    _id:           doc._id,
                    horaInicio:    doc.horaInicio,
                    horaFim:       doc.horaFim,
                    obraAssociada: doc.obraAssociada,
                    SPECIFIC_GET_URL: 'http://localhost:3000/actividade/'+doc._id
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
exports.editarActividade=(req,res,next)=>{
    const id = req.params.detId; 
    const updateOps={};

    for(const ops of req.body ){
       updateOps[ops.propName] = ops.value;
    }
    actividadeModel.update({_id: id},{$set:updateOps})
     .exec()
     .then(result=> {
            res.status(200).json({
                message: "actividade actualizada" ,
                produto_actualizado: {
                    designacao: result.designacao,
                    detalhes: result.detalhes,
                    inicio: result.inicio,
                    fim: result.fim,
                    GET_URL: 'http://localhost:3000/actividade/'+id
                }
            })
        })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error:err})
      })
}
exports.eliminarActividade=(req,res,next)=>{
    actividadeModel.remove({_id:req.params.id})
    .exec()
    .then( result=> {
            res.status(200).json({
                message : "Actividade eliminada",
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