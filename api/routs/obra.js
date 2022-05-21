const express= require('express');
const router = express.Router();//para os métodos REST
const obraController= require('../controllers/obraController')


router.post('/registar',obraController.registarObra);
router.get('/listar',obraController.listarObras);
router.patch('/editar',obraController.editarObra);
router.delete('/eliminar/:id',obraController.eliminarObra);


module.exports= router