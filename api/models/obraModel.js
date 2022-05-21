const mongoose = require('mongoose');

const obraModel=mongoose.Schema({
    _id:         mongoose.Schema.Types.ObjectId,
    designacao:  {type: String, required: true},
    detalhes:    {type: String, required: true},
    localizacao: {type: String, required: true},
    zelador:     {type: String, required: true},
    inicio:      {type: String, required: true},
    fim:         {type: String, required: true}
    
})

module.exports= mongoose.model('obras',obraModel);