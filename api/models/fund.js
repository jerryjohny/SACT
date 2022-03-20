const mongoose = require('mongoose');

const fundSchema=mongoose.Schema({
    _id:            {type: mongoose.Schema.Types.ObjectId},
    description:    {type:String, required: true},
    creation_date:  {type: Date, required:true}     
})

module.exports= mongoose.model('Funds',fundSchema);