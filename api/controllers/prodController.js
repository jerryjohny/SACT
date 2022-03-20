const ProductModel= require('../models/productModel');
const mongoose = require('mongoose');

exports.get_all_prod=(req,res,next)=>{
    ProductModel.find()
    .select('name price _id')
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            products: doc.map(doc=>{
                return{
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    SPECIFIC_GET_URL: 'http://localhost:3000/orders/'+doc._id
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
exports.get_prod_by_Id=(req,res,next)=>{
    const id = req.params.detId;
    ProductModel.findById(id)
    .select('name price _id')
    .exec()
    .then(doc=>{
       console.log("dabase de dados",doc) ;
       res.status(200).json({
           name: doc.name,
           price: doc.price,
           id: doc._id,
           GET_URL: 'http://localhost:3000/products/'+doc._id
        });
    })
    .catch(err=>{ 
        console.log(err);
        res.status(500).json({error:err});
    });
}
exports.reg_prod=(req,res,next)=>{
    const produto = new ProductModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    produto
    .save()
    .then(result=>{
        console.log(result);
        res.status(200).json({ 
            message: "Novo post" ,
            produto_criado: {
                name: result.name,
                price: result.price,
                GET_URL: 'http://localhost:3000/products/'+result._id,
                info:req.userData
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
exports.update_prod=(req,res,next)=>{
    const id = req.params.detId; 
    const updateOps={};

    for(const ops of req.body ){
       updateOps[ops.propName] = ops.value;
    }
    ProductModel.update({_id: id},{$set:updateOps})
     .exec()
     .then(result=> {
            res.status(200).json({
                message: "Actualizado" ,
                produto_actualizado: {
                    name: result.name,
                    price: result.price,
                    GET_URL: 'http://localhost:3000/products/'+id
                }
            })
        })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error:err})
      })
}
exports.delete_prod=(req,res,next)=>{
    ProductModel.remove({_id:req.params.id})
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

