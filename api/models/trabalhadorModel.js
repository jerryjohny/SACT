const mongoose = require('mongoose');

const trabalhadorModel=mongoose.Schema({
    _id:                mongoose.Schema.Types.ObjectId,
    nome:              {type: String, required: true},
    telefone:          {type: String, required: true},
    morada:            {type: String, required: true},
    BI:                {type: String, required: true},
    especialidade:     {type: String, required: true},
    tipo_trabalhador:  {type: String, required: true},
    nivel_experiencia: {type: String, required: true},
    link_cv:           {type: String, required: true, default:"link default"},
    status:            {type: String, required: true, default:"false"}
})

module.exports= mongoose.model('trabalhadores',trabalhadorModel);
