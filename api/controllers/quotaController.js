const quotaModel     = require('../models/quota')
const estateVerifyer = require('../models/estate')
const userVerifyer   = require('../models/userModel')
const mongoose       = require('mongoose');

exports.buy_quota=(req,res,next)=>{
    estateVerifyer.findById(req.body.estate)
    .then(ent=> {
        userVerifyer.findById(req.body.owner).then(user=>{
            if (!user){
                return res.status(404).json({
                    message: "Sorry, no such quata owner in database"
                });
            }
        })
        if (!ent){
            return res.status(404).json({
                message: "Sorry, no such fund in database"
            });
        }
        const quota = new quotaModel({
            _id:              new mongoose.Types.ObjectId(),
            estate:           req.body.estate,
            owner:            req.body.owner,
            price:            req.body.price,
            revenue:          req.body.revenue,
            revenue_type:     req.body.revenue_type,
            equity_value_pct: req.body.equity_value_pct,
            purchase_date:    Date.now(),
        });
        return quota.save()
        .then(result=> {
            res.status(201).json({
                messsage: "Quota baught",
                newOrder: {
                    _id:            result._id,
                    estate:         result.estate,
                    owner:          result.owner,
                    revenue:        result.revenue,
                    price:          result.price,
                    purchase_date:  result.purchase_date,
                    GET_URL:        'http://localhost:4000/estate/'+result._id
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
exports.get_all_quotas = (req,res,next)=>{
    quotaModel.find()
    //.populate("productId","name price")
    .select('_id estate owner price equity_value_pct revenue revenue_type purchase_date')
    .exec()
    .then( result=>{
        const resposta={
            count: result.length,
            order: result.map(result=>{
                return{
                    _id:     result._id,
                    price: result.price,
                    revenue: result.revenue,
                    SPECIFIC_GET_URL: 'http://localhost:4000/quota/'+result._id
                }
            })
        }
       res.status(200).send(resposta.order)
     })
    .catch()
}
exports.get_quota_by_id=(req,res,next)=>{
    const id = req.params.id;
    quotaModel.findById(id)
    .select('_id estate owner price equity_value_pct revenue revenue_type purchase_date')
    .populate('estate owner','description revenue name')
    .exec()
    .then(result => {
        if(!result){
             return res.status(404).json({message:"Quota not found"})
        }
        res.status(200).json({
            estate:         result.estate.description,
            owner:          result.owner.name,
            price:          result.price,
            revenue:        result.revenue ,
            equity_value:   result.equity_value_pct,
            quota_id:       result._id,
            owner_id:       result.owner._id,
            estate_id:      result.estate._id,
            purchase_date:  result.purchase_date
        })
    })
    .catch(err=>{ 
        console.log(err);
        res.status(500).json({error:err});
    })
    next
}
exports.update_quota =( req,res,next)=>{
    const id = req.params.id; 
    const updateOps={};

    for(const ops of req.body ){
       updateOps[ops.propName] = ops.value;
    }
    quotaModel.updateOne({_id: id},{$set:updateOps})
     .exec()
     .then(result=> {
            res.status(200).json({
                message: "Quota has been updated" ,
                Ordem_actualizada: {
                    quota: id,
                    GET_URL: 'http://localhost:4000/quota/'+id
                }
            })
        })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error:err})
      })
}
exports.delete_quota=(req,res,next)=>{
    const deletando = req.params.id;
    quotaModel.remove({_id:req.params.id})
    .exec()
    .then(
        res.status(200).json({ 
            message: "Quota deleted",
            id: deletando
        })
    )
}
