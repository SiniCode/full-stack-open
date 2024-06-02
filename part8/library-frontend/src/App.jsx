import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
	const [page, setPage] = useState('authors')
	const [errorMessage, setErrorMessage] = useState(null)

	const notify = (message) => {
		setErrorMessage(message)
		setTimeout(() => setErrorMessage(null), 5000)
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>Authors</button>
				<button onClick={() => setPage('books')}>Books</button>
				<button onClick={() => setPage('add')}>Add book</button>
			</div>

			<h1>Library App</h1>
			<div>{errorMessage}</div>

			<Authors show={page === 'authors'} notify={notify} />

			<Books show={page === 'books'} />

			<NewBook show={page === 'add'} notify={notify} />
		</div>
	)
}

export default App
