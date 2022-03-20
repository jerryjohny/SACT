const mongoose = require('mongoose');

const estateSchema=mongoose.Schema({
    _id:                {type: mongoose.Schema.Types.ObjectId},
    description:        {type: String, required: true},
    location:           {type: String, required: true},
    revenue:            {type: Number, required: true},
    revenue_type:       {type: String, required: true},
    numb_of_quotas:     {type: Number, required: true},
    fund:               {type: mongoose.Schema.Types.ObjectId, ref: 'Funds',required: true},
    equity_value_pct:   {type: Number, required:true} 
})

module.exports= mongoose.model('Estates',estateSchema);