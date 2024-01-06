const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./models");
db.sequelize.sync()
	.then(() => {
		console.log("Synced db.");
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});

var corsOptions = {
	origin: "*"
};

// routes
const loginRoute = require("./routes/login");
const profesorRoute = require("./routes/profesor")
const horarioRoute = require("./routes/horario")
const userRoute = require("./routes/user")
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(loginRoute)
app.use(profesorRoute)
app.use(horarioRoute)
app.use(userRoute)
// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to bezkoder application." });
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});