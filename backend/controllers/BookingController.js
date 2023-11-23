// att göra: lägg till funktioner som hanterar request m bookings movies seats?

// servitör? vad ska göras när det kommer in en request? kommunicera med modellen,
// samla ihop info / är infon rimlig?

const BookingModel = require("../models/BookingModel");

function handleShowAllBookings(req, res) {
    return res.send(BookingModel.showAllBookings())
}

function handleShowOneBookingById(req, res) {
    const idToFind = req.params.id;

    const booking = BookingModel.showOneBookingById(Number(idToFind));

    if (!booking) {
        res.status(404).send("No booking found");
    }

    return res.send(booking);
}

function handleCreate(req, res) {


    const newBooking = req.body;

    if (!newBooking.name || !newBooking.email || !newBooking.title || !newBooking.time) {
        return res.status(501).send("Request did not succeed. Check your request body");
    }

    const createdBooking = BookingModel.create(newBooking);

    return res.send(createdBooking);
}

module.exports = {
    // exportera funktioner här
    handleShowAllBookings,
    handleShowOneBookingById,
    handleCreate
}