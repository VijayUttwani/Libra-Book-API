// Framework
const mongoose = require("mongoose");

// Creating Author Schema

const AuthorSchema = mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	name: String,
	books: [String],
});

// Creating Author Model
const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;
