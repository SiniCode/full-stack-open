import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = (props) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			props.notify(error.graphQLErrors[0].message)
		},
	})

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value
			props.setToken(token)
			localStorage.setItem('library-user-token', token)
			setUsername('')
			setPassword('')
			props.setPage('books')
		}
	}, [result.data])

	const submit = async (event) => {
		event.preventDefault()
		login({ variables: { username, password } })
	}

	if (!props.show) {
		return null
	}

	return (
		<div>
			<h2>Log in</h2>
			<form onSubmit={submit}>
				<div>
					Username:
					<input
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					Password:
					<input
						type='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>Log in</button>
			</form>
		</div>
	)
}

export default Login
