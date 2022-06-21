const mongoose = require('mongoose');

const userModel=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    trabalhador:  {type: mongoose.Schema.Types.ObjectId, ref: 'trabalhadores',required: true},
    obra:         {type: mongoose.Schema.Types.ObjectId, ref: 'obras',required: true},
    email:{
        type: String,
        required: true,
        unique:true,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    }, 
    password: {type: String, required: true}
})

module.exports= mongoose.model('Users',userModel);