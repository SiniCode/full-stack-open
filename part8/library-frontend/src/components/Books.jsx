import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
	const [genre, setGenre] = useState(null)

	const result = useQuery(ALL_BOOKS, {
		variables: { genre },
	})

	if (!props.show) {
		return null
	}

	if (result.loading) {
		return <div>Loading...</div>
	}

	const books = result.data.allBooks
	let genres = []
	for (let i in books) {
		genres = genres.concat(books[i].genres)
	}
	genres = new Set(genres)
	genres = [...genres]

	return (
		<div>
			<h2>Books</h2>
			<h3>{`Selected genre: ${genre ? genre : 'all genres'}`}</h3>
			<p>
				<b>Change genre:</b>
			</p>
			<div>
				{genres.map((g) => (
					<button key={g} onClick={() => setGenre(g)}>
						{g}
					</button>
				))}
			</div>
			<button onClick={() => setGenre(null)}>All genres</button>

			<table>
				<tbody>
					<tr>
						<th>Title</th>
						<th>Author</th>
						<th>Year of publication</th>
					</tr>
					{books.map((b) => (
						<tr key={b.title}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Books
