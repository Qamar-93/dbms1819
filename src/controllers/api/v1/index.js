const express = require('express');
const routes = require('./routes.js');
const router = express.Router();

router.get('/services', routes.getServices);
// router.get('/services/:type', routes.getServicesByType);
router.get('/services/check', routes.checkAvailability);
router.get('/clients/:tax_code', routes.getUser);
router.get('/reservations', routes.getReservationView);
router.get('/availabe-rooms', routes.getAvialableRooms);
router.get('/my-reservations?', routes.getMyReservation);

router.get('/check-user-dates?', routes.checkAvailability);

router.post('/clients/add', routes.addUser);
router.post('/reservation/add', routes.makeReservation);
router.post('/orders/add', routes.makeOrder);


module.exports = router;
