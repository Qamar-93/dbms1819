const queries = require('../../../models/queries/index.js');

const getServices = (req, res) => {
  const data = req.body;
  queries.services.getServices((error, result) => {
    if (error)
      res.status(500).json({ message: error.message });
    else{
    res.setHeader('Content-Type', 'application/json');
      res.send(result);
    }
  });
};

const getServicesByType = (req, res) => {
const data = req.params.type;
queries.services.getServicesByType((error, result) => {
  if (error)
    res.status(500).json({ message: error.message });
  else{
  res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  }
});
};
const checkAvailability = (req, res) => {
  const data = req.body;
  queries.services.checkAvailability(data.reservation_id, data.service_id, (error, result) => {
    if (error)
      res.status(500).json({ message: error.message });
    else{
    res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    }
  });
  };
module.exports = {
  getServices,
  getServicesByType,
  checkAvailability
};
