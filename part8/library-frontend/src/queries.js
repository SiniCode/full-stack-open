import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

export const ALL_BOOKS = gql`
	query findBooks($genre: String) {
		allBooks(genre: $genre) {
			title
			author {
				name
			}
			published
			genres
		}
	}
`

export const NEW_BOOK = gql`
	mutation newBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			title
			author {
				name
			}
			published
			genres
		}
	}
`

export const SET_BIRTHYEAR = gql`
	mutation setBirthyear($name: String!, $born: Int!) {
		editAuthor(name: $name, setBornTo: $born) {
			name
			born
		}
	}
`

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			title
			author {
				name
			}
			published
			genres
		}
	}
`
