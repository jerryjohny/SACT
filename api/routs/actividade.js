const express= require('express');
const router = express.Router();//para os métodos REST
const actividadeController= require('../controllers/actividadeController')


router.post('/registar',actividadeController.registarActividade);
router.get('/listar',actividadeController.listarActividades);
router.patch('/editar',actividadeController.editarActividade);
router.delete('/eliminar/:id',actividadeController.eliminarActividade);


module.exports= router