module.exports = {
  getServices: require('./services.js').getServices,
  getServicesByType: require('./services.js').getServicesByType,
  checkAvailability: require('./services.js').checkAvailability,
  makeReservation: require('./reservations.js').makeReservation,
  makeOrder: require('./reservations.js').makeOrder,
  getReservationView: require('./reservations.js').getReservationView,
  addUser: require('./users.js').addUser,
  getUser: require('./users.js').getUser,
};
