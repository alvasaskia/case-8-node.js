const express = require("express");
const BookingRoutes = require("./routes/BookingRoutes");
// const cors = require("cors");
const app = express();
const PORT = 3000;

// Make it possible to serve other apps on the same computer
// app.use(cors());

// in order tp receive json data in req.body 
app.use(express.json());



app.get("/", (req, res) => {
    res.send("Hello from backend");
})

app.use(BookingRoutes);

app.get("*", (req, res) => {
    res.send("This route is not defined :(");
})



app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));