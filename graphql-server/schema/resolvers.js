const books = require("../../books.json");
const bookPath = "../books.json";
const fs = require("fs");

const readFile = (
	callback,
	returnJson = false,
	filePath = bookPath,
	encoding = "utf8"
) => {
	fs.readFile(filePath, encoding, (err, data) => {
		if (err) {
			throw err;
		}

		callback(returnJson ? JSON.parse(data) : data);
	});
};

const writeFile = (
	fileData,
	callback,
	returnJson = false,
	filePath = bookPath,
	encoding = "utf8"
) => {
	fs.writeFile(filePath, fileData, encoding, (err) => {
		if (err) {
			throw err;
		}

		callback();
	});
};

module.exports = {
	Query: {
		allBooks: (root, { filter }) => {
			return filter && Object.keys(filter).length
				? books.filter((book) => {
						book;
						return book[Object.keys(filter)[0]] === Object.values(filter)[0];
				  })
				: books;
		},
	},
	Mutation: {
		createBook: (_, data) => {
			readFile((bookData) => {
				const newBookId = Object.keys(bookData).length + 1;
				const insertData = { ...data.input, id: newBookId.toString() };
				bookData[newBookId - 1] = insertData;
				writeFile(JSON.stringify(bookData, null, 2), () => {
					return insertData;
				});
			}, true);
			return data.input;
		},
		updateBook: (_, srcData) => {
			readFile((data) => {
				const key = Object.keys(data).find(
					(book) => data[book].id === srcData.input.id
				);
				var book = data[key];
				data[key] = srcData.input;
				writeFile(JSON.stringify(data, null, 2), () => {
					return data;
				});
			}, true);

			return srcData.input;
		},
		deleteBook: (_, srcData) => {
			readFile((data) => {
				const key = Object.keys(data).find(
					(book) => data[book].id === srcData.id
				);
				if (key === undefined) {
					return "cant find book";
				}

				data = data.filter(function (book) {
					return book.id !== srcData.id;
				});
				//delete data[key]

				writeFile(JSON.stringify(data, null, 2), () => {
					return data;
				});
			}, true);

			return srcData;
		}
	},
};
