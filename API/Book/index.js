// Prefix : /book

// Initializing Express Router
const Router = require("express").Router();

// Database Models
const BookModel = require("../../database/book");
const AuthorModel = require("../../database/author");
const PublicationModel = require("../../database/publication");

/*
Route           /          
Description     Get all books     
Access          PUBLIC        
Parameter       NONE
Method          GET  
*/

Router.get("/", async (req, res) => {
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

Router.get("/isbn/:isbn", async (req, res) => {
	const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

	if (!getSpecificBook) {
		return res.json({
			error: `No book found for the ISBN of ${req.params.isbn}`,
		});
	}

	return res.json({ book: getSpecificBook });
});

/*
Route           book/category       
Description     Get all books by category    
Access          PUBLIC        
Parameter       category
Method          includes  
*/

Router.get("/category/:category", async (req, res) => {
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
Route           book/language      
Description     Get all books by language  
Access          PUBLIC        
Parameter       language
Method          GET  
*/

Router.get("/language/:language", async (req, res) => {
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
Route           /book/new        
Description     Add new book
Access          PUBLIC        
Parameter       none
Method          POST
*/

Router.post("/new", async (req, res) => {
	try {
		const { newBook } = req.body;

		await BookModel.create(newBook);

		return res.json({
			books: newBook,
			message: "book was added🚀",
		});
	} catch (error) {
		return res.json({ error: error.message });
	}
});

/*
Route           /book/update/title        
Description     Update book title 
Access          PUBLIC        
Parameter       isbn
Method          PUT
*/

Router.put("/update/title/:isbn", async (req, res) => {
	try {
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
	} catch (error) {
		return res.json({ error: error.message });
	}
});

/*
Route           /book/update/author       
Description     Update book author
Access          PUBLIC        
Parameter       isbn, authorId
Method          PUT, push
*/

Router.put("/update/author/:isbn/:authorId", async (req, res) => {
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
				id: parseInt(req.params.authorId),
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
Route           /book/delete       
Description     delete a book
Access          PUBLIC        
Parameter       isbn
Method          DELETE
*/

Router.delete("/delete/:isbn", async (req, res) => {
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

Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {
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

module.exports = Router;
