require("dotenv").config();

// Framework
const express = require("express");
const mongoose = require("mongoose");

// Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

// Initialization
const Libra = express();

// Configuration
Libra.use(express.json());

// Establish database connection
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("connection established🚀"));

// Initializing Microservices
Libra.use("/book", Books);
Libra.use("/author", Authors);
Libra.use("/publication", Publications);

Libra.listen(3000, () => console.log("The server is running🚀"));

// HTTP Client -> helper who helps you to make http request
