// menyn - kopplar ihop controllerns beteende och metoder med routes
const { Router } = require("express");
const BookingController = require("../controllers/BookingController");
const bookingRouter = Router();


// definera routes ang movies (booking?? seats?)

bookingRouter.get("/bookings", BookingController.handleShowAllBookings)
bookingRouter.get("/bookings/:id", BookingController.handleShowOneBookingById);
bookingRouter.post("/bookings", BookingController.handleCreate);

module.exports = bookingRouter;