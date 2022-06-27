const scheduleModel= require('../models/scheduleModel');
const mongoose = require('mongoose');
const client = require('twilio')("ACfda59ab84a419798bd2be8871198d2f9",'28dc57400b1acead257de6042185fabb')

exports.registarSchedule=(req,res,next)=>{
    const schedule = new scheduleModel({
        _id: new mongoose.Types.ObjectId(),
        actividade:  req.body.actividade,
        obra:        req.body.obra,//uma actividade está associada a uma obra
        trabalhador: req.body.trabalhador,
        inicio:      req.body.actividade,//o inicio do schedule é o inicio da actividade
        fim:         req.body.actividade,//fim do schedule é o fim da actividade também
        horaInicio:  req.body.horaInicio,
        horaFim:     req.body.horaInicio

    });
    schedule
    .save()
    .then(result=>{
        console.log(result);
        res.status(200).json({ 
            message: "Schedule adicionado" ,
            schedule: {
                actividade: result.actividade,
                obra:       result.obra.designacao,
                trabalhador:result.trabalhador,
                inicio:     result.inicio,
                fim:        result.fim,
                GET_URL: 'http://localhost:3000/schedule/'+result._id
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
exports.listarSchedules=(req,res,next)=>{
    scheduleModel.find()
    .select('actividade obra trabalhador inicio fim')
    .populate("actividade obra trabalhador inicio fim horaInicio horaFim"," designacao designacao nome inicio fim horaInicio horaFim ")
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            schedule: doc.map(doc=>{
                return{
                    actividade:  doc.actividade,
                    obra:        doc.obra,
                    trabalhador: doc.trabalhador,
                    inicio:      doc.inicio,
                    fim:         doc.fim,
                    _id:         doc._id,
                    SPECIFIC_GET_URL: 'http://localhost:3000/schedules/'+doc._id
                }
            })
        }
       console.log("dabase de dados",doc) ;
       res.status(200).json(resposta.schedule);
    })
    .catch(err=>{ 
        console.log(err);
        res.status(500).json({error:err});
    });
}
exports.listarSchedulesPorId=(req,res,next)=>{
    scheduleModel.find({actividade: req.params.cod_actividade})
    .select('actividade obra trabalhador inicio fim')
    .populate("actividade obra trabalhador inicio fim horaInicio horaFim"," designacao designacao nome inicio fim horaInicio horaFim ")
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            schedule: doc.map(doc=>{
                return{
                    actividade:  doc.actividade,
                    obra:        doc.obra,
                    trabalhador: doc.trabalhador,
                    inicio:      doc.inicio,
                    fim:         doc.fim,
                    _id:         doc._id,
                    SPECIFIC_GET_URL: 'http://localhost:3000/schedules/'+doc._id
                }
            })
        }
       console.log("dabase de dados",doc) ;
       res.status(200).json(resposta.schedule);
    })
    .catch(err=>{ 
        console.log(err);
        res.status(500).json({error:err});
    });
}
exports.listarSchedulesPorObra=(req,res,next)=>{
    scheduleModel.find({obra: req.params.obra})
    .select('actividade obra trabalhador inicio fim')
    .populate("actividade obra trabalhador inicio fim horaInicio horaFim"," designacao designacao nome inicio fim horaInicio horaFim ")
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            schedule: doc.map(doc=>{
                return{
                    actividade:  doc.actividade,
                    obra:        doc.obra,
                    trabalhador: doc.trabalhador,
                    inicio:      doc.inicio,
                    fim:         doc.fim,
                    _id:         doc._id,
                    SPECIFIC_GET_URL: 'http://localhost:3000/schedules/'+doc._id
                }
            })
        }
       console.log("dabase de dados",doc) ;
       res.status(200).json(resposta.schedule);
    })
    .catch(err=>{ 
        console.log(err);
        res.status(500).json({error:err});
    });
}
exports.editarSchedules=(req,res,next)=>{
    const id = req.params.detId; 
    const updateOps={};

    for(const ops of req.body ){
       updateOps[ops.propName] = ops.value;
    }
    scheduleModel.update({_id: id},{$set:updateOps})
     .exec()
     .then(result=> {
            res.status(200).json({
                message: "Schedule actualizada" ,
                produto_actualizado: {
                    designacao: result.designacao,
                    detalhes: result.detalhes,
                    GET_URL: 'http://localhost:3000/schedule/'+id
                }
            })
        })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error:err})
      })
}
exports.eliminarSchedule=(req,res,next)=>{
    scheduleModel.remove({_id:req.params.id})
    .exec()
    .then( result=> {
            res.status(200).json({
                message : "Schedule eliminada",
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

exports.mandarSms=(req,res,next)=>{

   
      client.messages.create({
      to:'+258878811900',
      from:'+13342588698',
      body:'teste de envio de sms a partir do programa'
  })
  res.send("SMS enviada")
}