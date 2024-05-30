import { useState } from 'react'
import { Button, TextField, Stack, Typography } from '@mui/material'

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
			<Typography component='h2' variant='h2'>
				Log in
			</Typography>
			<form onSubmit={handleLogin}>
				<Stack spacing={2} maxWidth={400} marginTop={2}>
					<TextField
						color='secondary'
						id='username'
						label='Username'
						variant='outlined'
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						autoFocus
					/>
					<TextField
						color='secondary'
						id='password'
						label='Password'
						variant='outlined'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button type='submit' variant='contained' color='secondary'>
						Log in
					</Button>
				</Stack>
			</form>
		</div>
	)
}

export default Login
