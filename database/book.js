// Framework
const mongoose = require("mongoose");

// Creating book schema
const BookSchema = mongoose.Schema({
	ISBN: String,
	title: String,
	pubDate: String,
	language: String,
	numPage: Number,
	author: [Number],
	publication: Number,
	category: [String],
});

// Creating book model

const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
