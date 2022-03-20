const orderModel= require('../models/orderModel')
const mongoose = require('mongoose');
const prodVerifyer= require('../models/productModel')

exports.update_order =( req,res,next)=>{
    const id = req.params.detId; 
    const updateOps={};

    for(const ops of req.body ){
       updateOps[ops.propName] = ops.value;
    }
    orderModel.update({_id: id},{$set:updateOps})
     .exec()
     .then(result=> {
            res.status(200).json({
                message: "Ordem actualizada" ,
                Ordem_actualizada: {
                    orderId: id,
                    GET_URL: 'http://localhost:3000/orders/'+id
                }
            })
        })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error:err})
      })
}

exports.get_all_orders = (req,res,next)=>{
    orderModel.find()
    //.populate("productId","name price")
    .select('_id productId quantity')
    .exec()
    .then( result=>{
        const resposta={
            count: result.length,
            order: result.map(result=>{
                return{
                    _id:       result._id,
                    quantity: result.quantity,
                    productId: result.productId,
                    SPECIFIC_GET_URL: 'http://localhost:3000/orders/'+result._id
                }
            })
        }
       res.status(200).send(resposta.order)
     })
    .catch()
}

exports.get_order_by_id=(req,res,next)=>{
    const id = req.params.id;
    orderModel.findById(id).select('_id productId quantity')
    .populate('productId','name price')
    .exec()
    .then(result => {
        if(!result){
             return res.status(404).json({message:"Order not found"})
        }
        res.status(200).json({
            message: "found",
            order_id: result._id,
            productId: result.productId,
            orde_quantity: result.quantity
        })
    })
    .catch(err=>{ 
        console.log(err);
        res.status(500).json({error:err});
    })
}

exports.reg_order=(req,res,next)=>{
    prodVerifyer.findById(req.body.productId)
    .then(product=> {
        if (!product){
            return res.status(404).json({
                message: "Product not found"
            });
        }
        const order = new orderModel({
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            productId: req.body.productId
        });
        return order.save()
        .then(result=> {
            res.status(201).json({
                messsage: "New order posted",
                newOrder: {
                    _id:       result._id,
                    productId: result.productId,
                    quantity:  result.quantity,
                    GET_URL: 'http://localhost:3000/orders/'+result._id
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

exports.delete_order=(req,res,next)=>{
    const deletando = req.params.IdPorDeletar;
    orderModel.remove({_id:req.params.IdPorDeletar})
    .exec()
    .then(
        res.status(200).json({ 
            message: "Esta ordem será eliminada",
            id: deletando
        })
    )
}