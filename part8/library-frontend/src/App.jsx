import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = () => {
	const [token, setToken] = useState(null)
	const [page, setPage] = useState('books')
	const [errorMessage, setErrorMessage] = useState(null)
	const client = useApolloClient()

	useEffect(() => {
		const loggedUserToken = window.localStorage.getItem('library-user-token')
		if (loggedUserToken) {
			setToken(loggedUserToken)
		}
	}, [])

	useSubscription(BOOK_ADDED, {
		onData: ({ data }) => {
			const book = data.data.bookAdded
			window.alert(
				`New book was added to library: ${book.title} (${book.published}) by ${book.author.name}.`
			)
		},
	})

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
