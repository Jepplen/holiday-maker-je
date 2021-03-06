const residentsRouter = require("./residences");
const ordersRouter = require("./orders");
const usersRouter = require("./users");
const flightsRouter = require("./flights");
const myBookingsRouter = require("./myBookings");

module.exports = {
  routers: [residentsRouter, ordersRouter, usersRouter, flightsRouter, myBookingsRouter],
};
