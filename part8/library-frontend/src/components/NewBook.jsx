import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { NEW_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [published, setPublished] = useState('')
	const [genre, setGenre] = useState('')
	const [genres, setGenres] = useState([])

	const [newBook] = useMutation(NEW_BOOK, {
		refetchQueries: [ALL_BOOKS, ALL_AUTHORS],
		onError: (error) => {
			const messages = error.graphQLErrors.map((e) => e.message).join('\n')
			props.notify(messages)
		},
	})

	const submit = async (event) => {
		event.preventDefault()

		newBook({
			variables: { title, author, published: Number(published), genres },
		})

		setTitle('')
		setPublished('')
		setAuthor('')
		setGenres([])
		setGenre('')
	}

	const addGenre = () => {
		setGenres(genres.concat(genre))
		setGenre('')
	}

	if (!props.show) {
		return null
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					Title:
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					Author:
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					Year of publication:
					<input
						type='number'
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type='button'>
						Add genre
					</button>
				</div>
				<div>Genres: {genres.join(' ')}</div>
				<button type='submit'>Add book</button>
			</form>
		</div>
	)
}

export default NewBook
