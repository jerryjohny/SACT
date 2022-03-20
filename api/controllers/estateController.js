const estateModel= require('../models/estate')
const fundVerifyer = require('../models/fund')
const mongoose = require('mongoose');

exports.reg_estate=(req,res,next)=>{
    fundVerifyer.findById(req.body.fund)
    .then(fund=> {
        if (!fund){
            return res.status(404).json({
                message: "Sorry, no such fund in database"
            });
        }
        const estate = new estateModel({
            _id:              new mongoose.Types.ObjectId(),
            description:      req.body.description,
            location:         req.body.location,
            revenue:          req.body.revenue,
            revenue_type:     req.body.revenue_type,
            numb_of_quotas:   req.body.numb_of_quotas,
            equity_value_pct: req.body.equity_value_pct,
            fund:             req.body.fund,
        });
        return estate.save()
        .then(result=> {
            res.status(201).json({
                messsage: "New estate registered",
                newOrder: {
                    _id:         result._id,
                    description: result.description,
                    location:    result.location,
                    revenue:     result.revenue,
                    quotas:      result.numb_of_quotas,
                    fund:        result.fund,
                    GET_URL:    'http://localhost:4000/estate/'+result._id
                }
            });
        })
        .catch(err=> {
            res.status(500).json({
                erro: err
            })
        })
    })
}
exports.get_all_estates = (req,res,next)=>{
    estateModel.find()
    //.populate("productId","name price")
    .select('_id description location revenue revenue_type numb_of_quotas fund equity_value_pct')
    .exec()
    .then( result=>{
        const resposta={
            count: result.length,
            order: result.map(result=>{
                return{
                    description:       result.description,
                    location:          result.location,
                    revenue:           result.revenue,
                    revenue_type:      result.revenue_type,
                    quotas:            result.numb_of_quotas,
                    SPECIFIC_GET_URL: 'http://localhost:4000/quota/'+result._id
                }
            })
        }
       res.status(200).send(resposta.order)
     })
    .catch()
}
exports.update_estate =( req,res,next)=>{
    const id = req.params.id; 
    const updateOps={};

    for(const ops of req.body ){
       updateOps[ops.propName] = ops.value;
    }
    estateModel.updateOne({_id: id},{$set:updateOps})
     .exec()
     .then(result=> {
            res.status(200).json({
                message: "Quota has been updated" ,
                Ordem_actualizada: {
                    quota:   id,
                    GET_URL: 'http://localhost:4000/estate/'+id
                }
            })
        })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error:err})
      })
}
exports.delete_estate=(req,res,next)=>{
    const deletando = req.params.id;
    estateModel.remove({_id:req.params.id})
    .exec()
    .then(
        res.status(200).json({ 
            message: "Estate deleted",
            id: deletando
        })
    )
}






