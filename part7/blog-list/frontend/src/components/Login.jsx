import { useState } from 'react'

const Login = ({ doLogin }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = (event) => {
		event.preventDefault()
		doLogin({ username, password })
		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<label>
					Username:
					<input
						type='text'
						data-testid='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<label>
					Password:
					<input
						type='password'
						value={password}
						data-testid='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<button type='submit'>Log in</button>
			</form>
		</div>
	)
}

export default Login
