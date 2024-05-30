import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'

const NavBar = ({ user, logout }) => {
	const navigate = useNavigate()

	const handleLogout = async () => {
		await logout()
		navigate('/')
	}

	return (
		<AppBar position='static' color='secondary'>
			<Toolbar>
				<Button component={Link} to={'/'} color='inherit' size='large'>
					Blogs
				</Button>
				<Typography
					component='div'
					variant='h6'
					sx={{ flexGrow: 1 }}
					align='center'
				>
					{user.name} logged in
				</Typography>
				<Button onClick={handleLogout} color='inherit' size='large'>
					Log out
				</Button>
			</Toolbar>
		</AppBar>
	)
}

export default NavBar
