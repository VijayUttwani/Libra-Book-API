const express = require("express");

// Database
const database = require("./database");

// Initialization
const Libra = express();

/*
Route           /          
Description     Get all books     
Access          PUBLIC        
Parameter       NONE
Method          GET  
*/

Libra.get("/", (req, res) => {
	return res.json({ books: database.books });
});

/*
Route           /is          
Description     Get specific books by ISBN  
Access          PUBLIC        
Parameter       NONE
Method          GET  
*/

Libra.get("/is/:isbn", (req, res) => {
	const getSpecificBook = database.books.filter(
		(book) => book.ISBN === req.params.isbn
	);

	if (getSpecificBook.length === 0) {
		return res.json({
			error: `No book found for the ISBN of ${req.params.isbn}`,
		});
	}

	return res.json({ book: getSpecificBook });
});

/*
Route           /c         
Description     Get all books by category    
Access          PUBLIC        
Parameter       category
Method          includes  
*/

Libra.get("/c/:category", (req, res) => {
	const getSpecificBook = database.books.filter((book) =>
		book.category.includes(req.params.category)
	);

	if (getSpecificBook.length === 0) {
		return res.json({
			error: `No book found for the category of ${req.params.isbn}`,
		});
	}

	return res.json({ book: getSpecificBook });
});

/*
Route           /l        
Description     Get all books by language  
Access          PUBLIC        
Parameter       language
Method          GET  
*/

Libra.get("/l/:language", (req, res) => {
	const getSpecificBook = database.books.filter(
		(book) => book.language === req.params.language
	);

	if (getSpecificBook.length === 0) {
		return res.json({
			error: `No book found for the language of ${req.params.isbn}`,
		});
	}

	return res.json({ book: getSpecificBook });
});

/*
Route           /author          
Description     Get all authors     
Access          PUBLIC        
Parameter       NONE
Method          GET  
*/

Libra.get("/author", (req, res) => {
	return res.json({ author: database.authors });
});

/*
Route           /author/n      
Description     Get specific authors by name   
Access          PUBLIC        
Parameter       name
Method          GET  
*/

Libra.get("/author/n/:name", (req, res) => {
	const getSpecificAuthor = database.authors.filter(
		(author) => author.name === req.params.name
	);

	if (getSpecificAuthor.length === 0) {
		return res.json({
			error: `No Author found for the name ${req.params.name}`,
		});
	}

	return res.json({ author: getSpecificAuthor });
});

/*
Route           /author/book/:isbn     
Description     Get all authors by books  
Access          PUBLIC        
Parameter       isbn
Method          includes 
*/

Libra.get("/author/book/:isbn", (req, res) => {
	const getSpecificAuthor = database.authors.filter((author) =>
		author.books.includes(req.params.isbn)
	);

	if (getSpecificAuthor.length === 0) {
		return res.json({
			error: `No Author found for the book ${req.params.isbn}`,
		});
	}

	return res.json({ book: getSpecificAuthor });
});

/*
Route           /publications          
Description     Get all publications  
Access          PUBLIC        
Parameter       NONE
Method          GET  
*/

Libra.get("/publications", (req, res) => {
	return res.json({ publication: database.publications });
});

/*
Route           /p         
Description     Get specific publications by name
Access          PUBLIC        
Parameter       name
Method          GET  
*/

Libra.get("/p/:name", (req, res) => {
	const getSpecificPublication = database.publications.filter(
		(publication) => publication.name === req.params.name
	);

	if (getSpecificPublication.length === 0) {
		return res.json({
			error: `No Publication found for the name ${req.params.name}`,
		});
	}

	return res.json({ author: getSpecificPublication });
});

/*
Route           /p         
Description     Get publication by book
Access          PUBLIC        
Parameter       name
Method          includes 
*/

Libra.get("/publication/book/:isbn", (req, res) => {
	const getSpecificPublication = database.publications.filter((publication) =>
		publication.books.includes(req.params.isbn)
	);
	if (getSpecificPublication.length === 0) {
		return res.json({
			error: `No publication found for the book ${req.params.isbn}`,
		});
	}

	return res.json({ publications: getSpecificPublication });
});

/*
Route           /book/new        
Description     Add new book
Access          PUBLIC        
Parameter       name
Method          POST
*/

Libra.post("/book/new", (req, res) => {
	const { newBook } = req.body;
	
});

Libra.listen(3000, () => console.log("The server is running🚀"));
