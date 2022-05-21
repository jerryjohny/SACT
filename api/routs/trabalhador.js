const express= require('express');
const router = express.Router();//para os métodos REST
const trabalhadorController= require('../controllers/trabalhadorController')

router.post('/registar',trabalhadorController.registarTrabalhador);
router.get('/listar',trabalhadorController.listarTrabalhadores);
router.delete('/eliminar/:BI',trabalhadorController.eliminarTrabalhador);


module.exports= router