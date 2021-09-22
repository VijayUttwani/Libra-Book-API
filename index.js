const express = require("express");

// Database
const database = require("./database");

// Initialization
const Libra = express();

// Configuration
Libra.use(express.json());

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
Parameter       isbn
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
Route           /author/book    
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
Route           /publication/book       
Description     Get publication by book
Access          PUBLIC        
Parameter       isbn
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
Parameter       none
Method          POST
*/

Libra.post("/book/new", (req, res) => {
	console.log(req.body);
	const { newBook } = req.body;
	database.books.push(newBook);
	return res.json({ books: database.books });
});

/*
Route           /author/new        
Description     Add new auhtor to a book
Access          PUBLIC        
Parameter       none
Method          POST
*/

Libra.post("/author/new", (req, res) => {
	console.log(req.body);
	const { newAuthor } = req.body;
	database.authors.push(newAuthor);
	return res.json({ authors: database.authors });
});

/*
Route           /publication/new        
Description     Add new auhtor to a book
Access          PUBLIC        
Parameter       none
Method          POST
*/

Libra.post("/publication/new", (req, res) => {
	console.log(req.body);
	const { newPublication } = req.body;
	database.publications.push(newPublication);
	return res.json({ publications: database.publications });
});

/*
Route           /book/update/title        
Description     Update book title 
Access          PUBLIC        
Parameter       isbn
Method          PUT
*/

Libra.put("/book/update/title/:isbn", (req, res) => {
	database.books.forEach((books) => {
		if (books.ISBN === req.params.isbn) {
			books.title = req.body.newBookTitle;
			return;
		}
	});

	return res.json({ books: database.books });
});

/*
Route           /book/update/author       
Description     Update book author
Access          PUBLIC        
Parameter       isbn, authorId
Method          PUT, push
*/

Libra.put("/book/update/author/:isbn/:authorId", (req, res) => {
	//update book database
	database.books.forEach((books) => {
		if (books.ISBN === req.params.isbn) {
			return books.author.push(parseInt(req.params.authorId));
		}
	});
	//update author database
	database.authors.forEach((authors) => {
		if (authors.id === parseInt(req.params.authorId)) {
			return authors.books.push(req.params.isbn);
		}
	});

	return res.json({ books: database.books, authors: database.authors });
});

/*
Route           /author/update     
Description     Update author name 
Access          PUBLIC        
Parameter       id
Method          PUT
*/

Libra.put("/author/update/:id", (req, res) => {
	database.authors.forEach((authors) => {
		if (authors.id === parseInt(req.params.id)) {
			authors.name = req.body.newAuthorName;
			return;
		}
	});

	return res.json({ authors: database.authors });
});

/*
Route           /publication/update        
Description     Update publication name 
Access          PUBLIC        
Parameter       id
Method          PUT
*/

Libra.put("/publication/update/:id", (req, res) => {
	database.publications.forEach((publications) => {
		if (publications.id === parseInt(req.params.id)) {
			publications.name = req.body.newPublicationName;
			return;
		}
	});

	return res.json({ publications: database.publications });
});

/*
Route           /publication/update/book       
Description     Update books to publications
Access          PUBLIC        
Parameter       pubId, isbn
Method          PUT, push
*/

Libra.put("/publication/update/book/:isbn", (req, res) => {
	//update publication database
	database.publications.forEach((publications) => {
		if (publications.id === req.body.pubId) {
			return publications.books.push(req.params.isbn);
		}
	});

	//update book database
	database.books.forEach((books) => {
		if (books.ISBN === req.params.isbn) {
			books.publication = req.body.pubId;
			return;
		}
	});

	return res.json({
		books: database.books,
		publications: database.publications,
		message: "Successfully updated publication",
	});
});

Libra.listen(3000, () => console.log("The server is running🚀"));

// HTTP Client -> helper who helps you to make http request
