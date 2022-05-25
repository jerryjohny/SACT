const mongoose = require('mongoose');

const scheduleModel=mongoose.Schema({
    _id:           mongoose.Schema.Types.ObjectId,
    actividade:  {type: mongoose.Schema.Types.ObjectId, ref: 'actividades',required: true},
    obra:        {type: mongoose.Schema.Types.ObjectId, ref: 'obras',required: true},
    trabalhador: {type: mongoose.Schema.Types.ObjectId, ref: 'trabalhadores',required: true},
    inicio:      {type: mongoose.Schema.Types.ObjectId, ref: 'actividades',required: true},
    fim:         {type: mongoose.Schema.Types.ObjectId, ref: 'actividades',required: true},
})

module.exports= mongoose.model('schedules',scheduleModel);