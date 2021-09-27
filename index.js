require("dotenv").config();

// Framework
const express = require("express");
const mongoose = require("mongoose");

// Database
const database = require("./database/database");

// Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

// Initialization
const Libra = express();

// Configuration
Libra.use(express.json());

// Establish database connection
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("connection established🚀"));

/*
Route           /          
Description     Get all books     
Access          PUBLIC        
Parameter       NONE
Method          GET  
*/

Libra.get("/", async (req, res) => {
	const getAllBooks = await BookModel.find();

	return res.json({ books: getAllBooks });
});

/*
Route           /is          
Description     Get specific books by ISBN  
Access          PUBLIC        
Parameter       isbn
Method          GET  
*/

Libra.get("/is/:isbn", async (req, res) => {
	const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

	if (!getSpecificBook) {
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

Libra.get("/c/:category", async (req, res) => {
	const getSpecificBook = await BookModel.findOne({
		category: req.params.category,
	});

	if (!getSpecificBook) {
		return res.json({
			error: `No book found for the category of ${req.params.category}`,
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

Libra.get("/l/:language", async (req, res) => {
	const getSpecificBook = await BookModel.findOne({
		language: req.params.language,
	});

	if (!getSpecificBook) {
		return res.json({
			error: `No book found for the language of ${req.params.language}`,
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

Libra.get("/author", async (req, res) => {
	const getAllAuthors = await AuthorModel.find();

	return res.json(getAllAuthors);
});

/*
Route           /author/n      
Description     Get specific authors by name   
Access          PUBLIC        
Parameter       name
Method          GET  
*/

Libra.get("/author/:authorId", async (req, res) => {
	const getSpecificAuthor = await AuthorModel.findOne({
		id: req.params.authorId,
	});
	//const getSpecificAuthor = database.authors.filter(
	//	(author) => author.id === parseInt(req.params.authorId)
	//);

	if (!getSpecificAuthor) {
		return res.json({
			error: `No Author found for the id ${req.params.authorId}`,
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

Libra.get("/author/book/:isbn", async (req, res) => {
	const getSpecificAuthor = await AuthorModel.findOne({
		books: req.params.isbn,
	});

	if (!getSpecificAuthor) {
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

Libra.get("/publication", async (req, res) => {
	const getAllPublications = await PublicationModel.find();

	return res.json(getAllPublications);
});

/*
Route           /p         
Description     Get specific publications by name
Access          PUBLIC        
Parameter       name
Method          GET  
*/

Libra.get("/publication/:pubId", async (req, res) => {
	const getSpecificPublication = await PublicationModel.findOne({
		id: req.params.pubId,
	});

	if (!getSpecificPublication) {
		return res.json({
			error: `No Publication found for the id ${req.params.pubId}`,
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

Libra.get("/publication/book/:isbn", async (req, res) => {
	const getSpecificPublication = await PublicationModel.findOne({
		books: req.params.isbn,
	});

	if (!getSpecificPublication) {
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

Libra.post("/book/new", async (req, res) => {
	const { newBook } = req.body;

	BookModel.create(newBook);

	return res.json({
		books: newBook,
		message: "book was added🚀",
	});
});

/*
Route           /author/new        
Description     Add new auhtor to a book
Access          PUBLIC        
Parameter       none
Method          POST
*/

Libra.post("/author/new", async (req, res) => {
	const { newAuthor } = req.body;

	AuthorModel.create(newAuthor);

	return res.json({
		authors: newAuthor,
		message: "author was added🚀",
	});
});

/*
Route           /publication/new        
Description     Add new auhtor to a book
Access          PUBLIC        
Parameter       none
Method          POST
*/

Libra.post("/publication/new", async (req, res) => {
	const { newPublication } = req.body;

	PublicationModel.create(newPublication);

	return res.json({
		publications: newPublication,
		message: "publication was added🚀",
	});
});

/*
Route           /book/update/title        
Description     Update book title 
Access          PUBLIC        
Parameter       isbn
Method          PUT
*/

Libra.put("/book/update/title/:isbn", async (req, res) => {
	const updatedBookDatabase = await BookModel.findOneAndUpdate(
		{
			ISBN: req.params.isbn,
		},
		{
			title: req.body.newBookTitle,
		},
		{
			new: true,
		}
	);

	return res.json({
		books: updatedBookDatabase,
		message: "Book title was updated✅",
	});
});

/*
Route           /book/update/author       
Description     Update book author
Access          PUBLIC        
Parameter       isbn, authorId
Method          PUT, push
*/

Libra.put("/book/update/author/:isbn/:authorId", async (req, res) => {
	//update book database
	const updatedBookDatabase = await BookModel.findOneAndUpdate(
		{
			ISBN: req.params.isbn,
		},
		{
			$addToSet: {
				author: parseInt(req.params.authorId),
			},
		},
		{
			new: true,
		}
	);

	//update author database
	const updatedAuthorDatabase = await AuthorModel.findOneAndUpdate(
		{
			id: req.params.authorId,
		},
		{
			$addToSet: {
				books: req.params.isbn,
			},
		},
		{
			new: true,
		}
	);

	return res.json({
		books: updatedBookDatabase,
		authors: updatedAuthorDatabase,
		message: "Book author was updated✅",
	});
});

/*
Route           /author/update     
Description     Update author name 
Access          PUBLIC        
Parameter       id
Method          PUT
*/

Libra.put("/author/update/name/:authorId", async (req, res) => {
	const updatedAuthorDatabase = await AuthorModel.findOneAndUpdate(
		{
			id: req.params.authorId,
		},
		{
			name: req.body.newAuthorName,
		},
		{
			new: true,
		}
	);

	return res.json({
		authors: updatedAuthorDatabase,
		messsage: "Author name was updated✅",
	});
});

/*
Route           /publication/update        
Description     Update publication name 
Access          PUBLIC        
Parameter       id
Method          PUT
*/

Libra.put("/publication/update/name/:pubId", async (req, res) => {
	const updatedPublicationDatabase = await PublicationModel.findOneAndUpdate(
		{
			id: parseInt(req.params.pubId),
		},
		{
			name: req.body.newPublicationName,
		},
		{
			new: true,
		}
	);

	return res.json({
		publications: updatedPublicationDatabase,
		message: "Publication name was updated✅",
	});
});

/*
Route           /publication/update/book       
Description     Update books in publications
Access          PUBLIC        
Parameter       pubId, isbn
Method          PUT, push
*/

Libra.put("/publication/update/book/:pubId/:isbn", async (req, res) => {
	//update publication database
	const updatedPublicationDatabase = await PublicationModel.findOneAndUpdate(
		{
			id: req.params.pubId,
		},
		{
			$addToSet: {
				books: req.params.isbn,
			},
		},
		{
			new: true,
		}
	);

	//update book database
	const updatedBookDatabase = await BookModel.findOneAndUpdate(
		{
			ISBN: req.params.isbn,
		},
		{
			$addToSet: {
				author: req.params.pubId,
			},
		},
		{
			new: true,
		}
	);

	return res.json({
		books: updatedBookDatabase,
		publications: updatedPublicationDatabase,
		message: "Successfully updated publication✅",
	});
});

/*
Route           /book/delete       
Description     delete a book
Access          PUBLIC        
Parameter       isbn
Method          DELETE
*/

Libra.delete("/book/delete/:isbn", async (req, res) => {
	const updatedBookDatabase = await BookModel.findOneAndDelete({
		ISBN: req.params.isbn,
	});

	return res.json({ message: "Book was deleted⛔" });
});

/*
Route           /book/delete/author     
Description     delete an author from book
Access          PUBLIC        
Parameter       isbn, authorId
Method          DELETE
*/

Libra.delete("/book/delete/author/:isbn/:authorId", async (req, res) => {
	//Update book database
	const updatedBookDatabase = await BookModel.findOneAndUpdate(
		{
			ISBN: req.params.isbn,
		},
		{
			$pull: {
				author: parseInt(req.params.authorId),
			},
		},
		{
			new: true,
		}
	);

	//Update author database
	const updatedAuthorDatabase = await AuthorModel.findOneAndUpdate(
		{
			id: parseInt(req.params.authorId),
		},
		{
			$pull: {
				books: req.params.isbn,
			},
		},
		{
			new: true,
		}
	);

	return res.json({
		books: updatedBookDatabase,
		authors: updatedAuthorDatabase,
		message: "Book author was deleted⛔",
	});
});

/*
Route           /author/delete       
Description     delete an autheor
Access          PUBLIC        
Parameter       authorId
Method          DELETE
*/

Libra.delete("/author/delete/:authorId", async (req, res) => {
	const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({
		id: req.params.authorId,
	});
	return res.json({ message: "Author was deleted⛔" });
});

/*
Route           /publication/delete       
Description     delete a publication
Access          PUBLIC        
Parameter       pubId
Method          DELETE
*/

Libra.delete("/publication/delete/:pubId", async (req, res) => {
	const updatedPublicationDatabase = await PublicationModel.findOneAndDelete({
		id: req.params.pubId,
	});

	return res.json({ messsage: "Publication was Deleted⛔" });
});

/*
Route           /publication/delete/book      
Description     delete a book from publications
Access          PUBLIC        
Parameter       pubId, isbn
Method          DELETE
*/

Libra.delete("/publication/delete/book/:pubId/:isbn", async (req, res) => {
	//Update publication database
	const updatedPublicationDatabase = await PublicationModel.findOneAndUpdate(
		{
			id: parseInt(req.params.pubId),
		},
		{
			$pull: {
				books: req.params.isbn,
			},
		},
		{
			new: true,
		}
	);

	//Update book database
	const updatedBookDatabase = await BookModel.findOneAndUpdate(
		{
			ISBN: req.params.isbn,
		},
		{
			publication: 0
		},
		{
			new: true,
		}
	);

	return res.json({
		publications: updatedPublicationDatabase,
		books: updatedBookDatabase,
		message: "book was deleted from publication⛔",
	});
});

Libra.listen(3000, () => console.log("The server is running🚀"));

// HTTP Client -> helper who helps you to make http request
