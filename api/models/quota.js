const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const quotaSchema=mongoose.Schema({
    _id:                {type: mongoose.Schema.Types.ObjectId},
    estate:             {type: mongoose.Schema.Types.ObjectId, ref: 'Estates',required: true},
    owner:              {type: mongoose.Schema.Types.ObjectId, ref: 'Users',required: true},    
    price:              {type: Number, required: true},
    equity_value_pct:   {type: Number, required: true},
    revenue:            {type: Number, required: true},
    revenue_type:       {type: String, required:true},
    purchase_date:      {type: Date, required:true}
})

module.exports= mongoose.model('Quotas',quotaSchema);