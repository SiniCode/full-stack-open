const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.author && !args.genre) {
				return Book.find({}).populate('author', { name: 1, born: 1 })
			} else if (!args.author) {
				return Book.find({ genres: args.genre }).populate('author', {
					name: 1,
					born: 1,
				})
			}
			const author = await Author.find({ name: args.author })
			if (!args.genre) {
				return Book.find({ author: author }).populate('author', {
					name: 1,
					born: 1,
				})
			}
			return Book.find({ author: author, genres: args.genre }).populate(
				'author',
				{ name: 1, born: 1 }
			)
		},
		allAuthors: async () => {
			return Author.find({})
		},
		me: (root, args, context) => {
			return context.currentUser
		},
	},

	Author: {
		bookCount: async ({ name }) => {
			const author = await Author.findOne({ name: name })
			const books = await Book.find({ author: author })
			return books.length
		},
	},

	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new GraphQLError('Authentication missing', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			let author = await Author.findOne({ name: args.author })
			if (!author) {
				const newAuthor = new Author({ name: args.author })
				try {
					author = await newAuthor.save()
				} catch (error) {
					throw new GraphQLError('Invalid author', {
						extensions: {
							code: 'BAD_USER_INPUT',
							invalidArgs: args.author,
							error,
						},
					})
				}
			}

			const newBook = new Book({ ...args, author: author })
			try {
				await newBook.save()
			} catch (error) {
				throw new GraphQLError('Adding the book failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						error,
					},
				})
			}

			pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

			return newBook
		},

		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new GraphQLError('Authentication missing', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			const target = await Author.findOne({ name: args.name })
			target.born = args.setBornTo
			try {
				await target.save()
			} catch (error) {
				throw new GraphQLError('Setting the birthyear failed', {
					extensions: {
						code: 'INVALID_USER_INPUT',
						error,
					},
				})
			}

			return target
		},

		createUser: async (root, args) => {
			const newUser = new User({ ...args })

			try {
				await newUser.save()
			} catch (error) {
				throw new GraphQLError('Creating new user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						error,
					},
				})
			}

			return newUser
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })
			if (!user || args.password !== 'supersecret') {
				throw new GraphQLError('Invalid credentials', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
		},
	},
}

module.exports = resolvers
