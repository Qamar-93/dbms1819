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

// const getServicesByType = (req, res) => {
// const data = req.params.type;
// queries.services.getServicesByType((error, result) => {
//   if (error)
//     res.status(500).json({ message: error.message });
//   else{
//   res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(result));
//   }
// });
// };
const checkAvailability = (req, res) => {  
  const data = req.query;
  queries.services.checkAvailability(data.user_id, data.service_id, data.from, data.to, (error, result) => {
    if (error)
      res.status(500).json({ message: error.message });
    else{
    res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    }
  });
  };
  
  
const getAvialableRooms = (req, res) => {
  queries.services.getAvialableRooms((error, result) => {
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
  // getServicesByType,
  checkAvailability,
  getAvialableRooms
};
