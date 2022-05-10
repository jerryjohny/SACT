const accountsModel= require('../models/account')
const mongoose = require('mongoose');
const userVerifyer= require('../models/userModel')

exports.create_account=(req,res,next)=>{
    userVerifyer.findById(req.body.owner)//ao criar uma conta, primeiro verifica-se se o usuario mencionado existe realmente
    .then(user=> {
        if (!user){
            return res.status(404).json({
                message: "User does not exist"
            });
        }
        accountsModel.find({owner:req.body.owner}).exec()
        .then(r=>{

            if (r.length>0){
                return res.status(404).json({
                    message: "User can only have one acccount!"
                });
            }else
            {
                const account = new accountsModel({
                        _id:     new mongoose.Types.ObjectId(),
                        owner:   req.body.owner,
                        balance: req.body.balance
                });   
                return account.save()
                .then(result=> {
                res.status(201).json({
                     messsage: "New account created",
                         newOrder: {
                            _id:     result._id,
                            owner:   result.owner,
                            balance: result.balance,
                            GET_URL: 'http://localhost:4000/accounts/'+result._id
                        }
                     });
                })
                .catch(err=> {
                    res.status(500).json({
                        erro: err
                    })
                })
            }
        })
    })
}
exports.get_all_accounts=(req,res,next)=>{
    accountsModel.find()
    .select('_id  owner balance')
    .populate('owner','name phone')
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            account: doc.map(doc=>{
                return{
                        account: doc._id,
                        owner: doc.owner.name,
                        owner_contact: doc.owner.phone,
                        balance: doc.balance,
                        GET_URL: 'http://localhost:4000/accounts/'+doc._id
                }
            })
        }
       console.log("dabase de dados",doc) ;
       res.status(200).json(resposta);
    })
    .catch(err=>{ 
        console.log(err);
        res.status(500).json({error:err});
    });
}
exports.update_balance=(req,res)=>{
  var amount= req.body.amount  
  var id = req.params.id; 
  var query = {_id: id};
  //var post = Meme.findOne(query);
  var post = accountsModel.findOne(query);
  accountsModel.findOneAndUpdate({_id :id},{$inc : {'balance' : amount}})
  .exec()
  .then(result=>{
    res.status(200).json({
        message: "Conta creditada",
        new_balance: parseFloat(result.balance)+ 
        parseFloat(amount)  
    })
  })
}
exports.get_account_by_id=(req,res,next)=>{
    const id = req.params.id;
    accountsModel.findById(id)
    .select('_id owner balance')
    .populate('owner',"name phone")
    .exec()
    .then(doc=>{

       console.log("dabase de dados",doc) ;
       res.status(200).json({
           account: doc._id,
           owner: doc.owner.name,
           owner_contact: doc.owner.phone,
           balance: doc.balance,
           GET_URL: 'http://localhost:4000/accounts/'+doc._id
        });
    })
    .catch(err=>{ 
        console.log(err);
        res.status(500).json({error:err});
    });
}
exports.delete_account=(req,res,next)=>{
    const deletando = req.params.id;
    accountsModel.findById(deletando).then(found=> {
        if(!found){
            return res.status(404).json({message: "No such account in database"})
        }else{
            accountsModel.remove({_id:req.params.id})
            .exec()
            .then(
                res.status(200).json({ 
                    message: "Account deleted",
                    id: deletando
                })
            )
        }
    })
}


  