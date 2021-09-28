// Prefix : publication

// Initializing Express Router
const Router = require("express").Router();

// Database Models
const PublicationModel = require("../../database/publication");

/*
Route           /publication          
Description     Get all publications  
Access          PUBLIC        
Parameter       NONE
Method          GET  
*/

Router.get("/", async (req, res) => {
	const getAllPublications = await PublicationModel.find();

	return res.json(getAllPublications);
});

/*
Route           /publication        
Description     Get specific publications by name
Access          PUBLIC        
Parameter       pubId
Method          GET  
*/

Router.get("/:pubId", async (req, res) => {
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

Router.get("/book/:isbn", async (req, res) => {
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
Route           /publication/new        
Description     Add new auhtor to a book
Access          PUBLIC        
Parameter       none
Method          POST
*/

Router.post("/new", async (req, res) => {
	const { newPublication } = req.body;

	PublicationModel.create(newPublication);

	return res.json({
		publications: newPublication,
		message: "publication was added🚀",
	});
});

/*
Route           /publication/update        
Description     Update publication name 
Access          PUBLIC        
Parameter       id
Method          PUT
*/

Router.put("/update/name/:pubId", async (req, res) => {
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

Router.put("/update/book/:pubId/:isbn", async (req, res) => {
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
Route           /publication/delete       
Description     delete a publication
Access          PUBLIC        
Parameter       pubId
Method          DELETE
*/

Router.delete("/delete/:pubId", async (req, res) => {
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

Router.delete("/delete/book/:pubId/:isbn", async (req, res) => {
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
			publication: 0,
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

module.exports = Router;