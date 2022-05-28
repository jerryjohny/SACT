const mongoose = require('mongoose');

const actividadeModel=mongoose.Schema({
    _id:           mongoose.Schema.Types.ObjectId,
    designacao:    {type: String, required: true},
    detalhes:      {type: String},
    inicio:        {type: String, required: true},
    fim:           {type: String, required: true},
    horaInicio:    {type: String, required: true},
    horaFim:       {type: String, required: true},
    obraAssociada: {type: mongoose.Schema.Types.ObjectId, ref: 'obras',required: true},
})

module.exports= mongoose.model('actividades',actividadeModel);