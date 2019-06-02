const express = require('express');
const routes = require('./routes.js');
const router = express.Router();

router.get('/services', routes.getServices);
router.get('/services/:type', routes.getServicesByType);
router.get('/services/check', routes.checkAvailability);
router.get('/clients/:tax_code', routes.getUser);
router.get('/reservations', routes.getReservationView);

router.post('/clients/add', routes.addUser);
router.post('/reservation/add', routes.makeReservation);
router.post('/orders/add', routes.makeOrder);


module.exports = router;
