const express= require('express');
const router = express.Router();//para os métodos REST
const scheduleController= require('../controllers/scheduleController')


router.post('/registar',scheduleController.registarSchedule);
router.get('/listar',scheduleController.listarSchedules);
router.get('/listar/:cod_actividade',scheduleController.listarSchedulesPorId);
router.patch('/editar',scheduleController.editarSchedules);
router.delete('/eliminar/:id',scheduleController.eliminarSchedule);
router.get('/sms', scheduleController.mandarSms);



module.exports= router