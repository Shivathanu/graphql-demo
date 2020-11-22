const { gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
	type BookCategory {
		id: ID!
		type: String
	}

	input BookCategoryInput {
		id: ID!
		type: String
	}

	type Book {
		id: ID!
		title: String!
		author: String!
		isbn: String!
		url: String!
		category: BookCategory
	}

	input BookInput {
		title: String!
		author: String!
		isbn: String!
		url: String!
		category: BookCategoryInput
	}

	input UpdateBookInput {
		id: ID!
		title: String!
		author: String!
		isbn: String!
		url: String!
		category: BookCategoryInput
	}

	input bookFilter {
		id: ID
		title: String
		author: String
		isbn: String
		url: String
		category: BookCategoryInput
	}

	type Mutation {
		createBook(input: BookInput!): Book
		updateBook(input: UpdateBookInput!): Book
	}

	type Query {
		allBooks(filter: bookFilter): [Book!]!
	}
`;

module.exports = typeDefs;