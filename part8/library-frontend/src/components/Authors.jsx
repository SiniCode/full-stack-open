import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthyearForm from './BirthyearForm'

const Authors = (props) => {
	const result = useQuery(ALL_AUTHORS)

	if (!props.show) {
		return null
	}

	if (result.loading) {
		return <div>Loading...</div>
	}

	const authors = result.data.allAuthors

	return (
		<div>
			<h2>Authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>Year of Birth</th>
						<th>Number of Books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<BirthyearForm
				notify={props.notify}
				authors={authors.map((author) => {
					return { value: author.name, label: author.name }
				})}
			/>
		</div>
	)
}

export default Authors
