import { Link } from 'react-router-dom'
import { Typography, Stack, Button, styled } from '@mui/material'
import Togglable from './Togglable'
import NewBlog from './NewBlog'

const BlogList = ({ blogs, handleCreate, blogFormRef }) => {
	const byLikes = (a, b) => b.likes - a.likes

	const Item = styled(Button)(() => ({
		justifyContent: 'left',
		color: 'inherit',
		size: 'large',
	}))

	return (
		<div>
			<Typography component='h2' variant='h2'>
				Blogs
			</Typography>
			<Togglable buttonLabel='Create new blog' ref={blogFormRef}>
				<NewBlog doCreate={handleCreate} />
			</Togglable>
			<Stack spacing={0.2} style={{ marginTop: 15 }}>
				{blogs.sort(byLikes).map((blog) => (
					<Item key={blog.id} component={Link} to={`/blogs/${blog.id}`}>
						{`${blog.title} by ${blog.author}`}
					</Item>
				))}
			</Stack>
		</div>
	)
}

export default BlogList
