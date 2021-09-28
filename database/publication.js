// Framework
const mongoose = require("mongoose");

// Creating Publication Schema
const PublicationSchema = mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	name: String,
	books: [String],
});

// Creating Publication Model
const PublicationModel = mongoose.model("publications", PublicationSchema);

module.exports = PublicationModel;
