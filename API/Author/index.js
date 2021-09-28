// prefix : author

// Initializing Express Router
const Router = require("express").Router();

// Database Models
const AuthorModel = require("../../database/author");
const PublicationModel = require("../../database/publication");
const BookModel = require("../../database/book");
// Relative Paths

/*
Route           /author          
Description     Get all authors     
Access          PUBLIC        
Parameter       NONE
Method          GET  
*/

Router.get("/", async (req, res) => {
	const getAllAuthors = await AuthorModel.find();

	return res.json(getAllAuthors);
});

/*
Route           /author     
Description     Get specific authors by name   
Access          PUBLIC        
Parameter       authorId
Method          GET  
*/

Router.get("/:authorId", async (req, res) => {
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

Router.get("/book/:isbn", async (req, res) => {
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
Route           /author/new        
Description     Add new auhtor to a book
Access          PUBLIC        
Parameter       none
Method          POST
*/

Router.post("/new", async (req, res) => {
	try {
		const { newAuthor } = req.body;

		await AuthorModel.create(newAuthor);

		return res.json({
			authors: newAuthor,
			message: "author was added🚀",
		});
	} catch (error) {
		return res.json({ error: error.message });
	}
});

/*
Route           /author/update     
Description     Update author name 
Access          PUBLIC        
Parameter       id
Method          PUT
*/

Router.put("/update/name/:authorId", async (req, res) => {
	try {
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
	} catch (error) {
		return res.json({ error: error.message });
	}
});

/*
Route           /author/delete       
Description     delete an autheor
Access          PUBLIC        
Parameter       authorId
Method          DELETE
*/

Router.delete("/delete/:authorId", async (req, res) => {
	const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({
		id: req.params.authorId,
	});
	return res.json({ message: "Author was deleted⛔" });
});

module.exports = Router;
