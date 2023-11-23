// att göra: lägg till funktioner som manipulerar data regarding bookings? seats? movie 

// kocken data manipulering - ska något läggas till tas bort redigeras?

const { set } = require("express/lib/application");
const fs = require("fs");

function getDatabase() {
    const bookingData = fs.readFileSync("bookings.json", {encoding: "utf-8"});
    return JSON.parse(bookingData);
}

function setDatabase(data) {
    const str = JSON.stringify(data);
    fs.writeFileSync('bookings.json', str);

}

// kanske inte ska vara seats utan bookings ? bookings av... seats?

// visa alla säten
// man vill se info tillhörande säte också, kanske se allShows?
function showAllBookings() {
    const allBookings = getDatabase();
    return allBookings;
}

// visa ett specifikt säte by id
// varför vill man se ett specifikt säte?
function showOneBookingById(id) {
    const allBookings = getDatabase();
    return allBookings.find(booking => booking.id === id);
}

// edit poem-kod..... men vill ej edit seat, vill boka? vill edit "booked: true/false"?

// function editOneById(newPoem) {
//     if (!newPoem.content || !newPoem.author || !newPoem.title) {
//         return false;
//     }

//     const allPoems = getDatabase();
//     const poemToEdit = allPoems.find(poem => poem.id === newPoem.id);

//     // change existing object with new changes
//     poemToEdit.title = newPoem.title;
//     poemToEdit.content = newPoem.content;
//     poemToEdit.author = newPoem.author;

//     setDatabase(allPoems);

//     return poemToEdit;
// }

function create(newBooking) {
    if (!newBooking.name || !newBooking.email || !newBooking.title || !newBooking.time) {
        return false;
    }

    // Read in the database
    const allBookings = getDatabase();
    
    // Add booking to array
    const bookingToAdd = { id: allBookings.length + 1, name: newBooking.name, email: newBooking.email, title: newBooking.title, time: newBooking.time };
    allBookings.push(bookingToAdd);

    // Set array as new database
    setDatabase(allBookings);

    return bookingToAdd;
}


module.exports = {
    // lägg här
    showAllBookings,
    showOneBookingById,
    create
}