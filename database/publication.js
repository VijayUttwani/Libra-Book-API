const { mongoose } = require("mongoose");

// Framework
const mongoose = require(mongoose);

// Creating Publication Schema
const PublicationSchema = mongoose.Schema({
	id: Number,
	name: String,
	books: [String],
});

// Creating Publication Model
const PublicationModel = mongoose.model(PublicationSchema);

module.exports = PublicationModel;
