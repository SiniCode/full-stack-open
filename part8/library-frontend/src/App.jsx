import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = () => {
	const [token, setToken] = useState(null)
	const [page, setPage] = useState('books')
	const [errorMessage, setErrorMessage] = useState(null)
	const client = useApolloClient()

	const notify = (message) => {
		setErrorMessage(message)
		setTimeout(() => setErrorMessage(null), 5000)
	}

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
		setPage('books')
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('books')}>Books</button>
				<button onClick={() => setPage('authors')}>Authors</button>
				{!token && <button onClick={() => setPage('login')}>Log in</button>}
				{token && (
					<>
						<button onClick={() => setPage('add')}>Add book</button>
						<button onClick={logout}>Log out</button>
					</>
				)}
			</div>

			<h1>Library App</h1>
			<div>{errorMessage}</div>
			<Books show={page === 'books'} />
			<Authors show={page === 'authors'} notify={notify} token={token} />
			<NewBook show={page === 'add'} notify={notify} />
			<Login
				show={page === 'login'}
				notify={notify}
				setToken={setToken}
				setPage={setPage}
			/>
		</div>
	)
}

export default App
