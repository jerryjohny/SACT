const mongoose = require('mongoose');

const accountSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Users',required: true},
    balance: {type: Number, default: 1}
   // created: mongoose.NativeDate
})

module.exports= mongoose.model('accounts',accountSchema);