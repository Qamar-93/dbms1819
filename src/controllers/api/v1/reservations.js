const queries = require('../../../models/queries/index.js');
const  makeReservation = (req, res) => {
        const data = req.body;
        queries.reservation.makeReservation(data.client_id,(error, result) => {
          if (error)
            res.status(500).json({ message: error.message });
          else{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
          }
        });
    };


const  getReservationView = (req, res) => {
    queries.reservation.getReservationView((error, result) => {
        if (error)
        res.status(500).json({ message: error.message });
        else{
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
        }
    });
};

const  getMyReservation = (req, res) => {
  queries.reservation.getMyReservation(req.query.userId,(error, result) => {
      if (error)
      res.status(500).json({ message: error.message });
      else{
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
      }
  });
};
const  makeOrder = (req, res) => {
    data = req.body;
    queries.reservation.makeOrder(data.reservation_id, data.service_id, data.state, (error, result) => {
        if (error)
        res.status(500).json({ message: error.message });
        else{
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
        }
    });
};
module.exports = {
   makeReservation,
   getReservationView,
   makeOrder,
   getMyReservation
  };
    
    