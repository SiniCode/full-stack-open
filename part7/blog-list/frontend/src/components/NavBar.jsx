import { Link } from 'react-router-dom'

const NavBar = ({ user, logout }) => {
	const padding = {
		padding: 10,
	}
	return (
		<div>
			<Link style={padding} to={'/'}>
				Blogs
			</Link>
			{user.name} logged in
			<button onClick={logout}>Log out</button>
		</div>
	)
}

export default NavBar
