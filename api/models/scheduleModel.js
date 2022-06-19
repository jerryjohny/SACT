const mongoose = require('mongoose');

const scheduleModel=mongoose.Schema({
    _id:           mongoose.Schema.Types.ObjectId,
    actividade:  {type: mongoose.Schema.Types.ObjectId, ref: 'actividades',required: true},
    obra:        {type: mongoose.Schema.Types.ObjectId, ref: 'obras',required: true},
    trabalhador: {type: mongoose.Schema.Types.ObjectId, ref: 'trabalhadores',required: true},
    inicio:      {type: String,required: true},
    fim:         {type: String,required: true},
    horaInicio:  {type: String,required: true},
    horaFim:     {type: String,required: true},
})

module.exports= mongoose.model('schedules',scheduleModel);