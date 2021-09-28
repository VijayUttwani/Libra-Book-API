// Framework
const mongoose = require("mongoose");

// Creating book schema
const BookSchema = mongoose.Schema({
	ISBN: {
		type: String,
		required: true,
		minLength: 8,
		maxLength: 10,
	},
	title: {
		type: String,
		required: true,
		minLength: 4,
		maxLength: 30,
	},
	pubDate: String,
	language: String,
	numPage: Number,
	author: [String],
	publication: {
		type: Number,
		required: true,
	},
	category: [String],
});

// Creating book model

const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
