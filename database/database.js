let books = [
	{
		ISBN: "12345Book",
		title: "Getting started with MERN",
		pubDate: "2021-09-20",
		language: "en",
		numPage: 250,
		author: [1, 2],
		publication: [1],
		category: ["tech", "programming", "education"],
	},
	{
		ISBN: "6789Space",
		title: "Getting started with Cosmos",
		pubDate: "2021-09-20",
		language: "en",
		numPage: 250,
		author: [2],
		publication: [2],
		category: ["tech", "programming", "education"],
	},
];

let authors = [
	{
		id: 1,
		name: "vijay",
		books: ["12345Book"],
	},
	{
		id: 2,
		name: "Elon Musk",
		books: ["12345Book", "6789Space"],
	},
];

let publications = [
	{
		id: 1,
		name: "writex",
		books: ["12345Book"],
	},
	{
		id: 2,
		name: "Marvel",
		books: [],
	},
];

module.exports = { books, authors, publications };
