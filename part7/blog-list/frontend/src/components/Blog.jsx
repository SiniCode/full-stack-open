import { useParams, useNavigate } from 'react-router-dom'
import { Button, Typography, Link, Avatar, Stack } from '@mui/material'
import { purple } from '@mui/material/colors'
import storage from '../services/storage'
import CommentSection from './CommentSection'

const Blog = ({ blogs, handleLike, handleDelete, handleComment }) => {
	const navigate = useNavigate()
	const id = useParams().id
	const blog = blogs.find((b) => b.id === id)
	if (!blog) {
		return (
			<div>
				<h2>Blog not found</h2>
			</div>
		)
	}

	const deleteBlog = async (blog) => {
		const deleted = await handleDelete(blog)
		if (deleted) {
			navigate('/')
		}
	}

	const nameOfUser = blog.user ? blog.user.name : 'anonymous'
	const canRemove = blog.user ? blog.user.username === storage.me() : true

	return (
		<div>
			<Typography component='h2' variant='h5' style={{ marginBottom: 20 }}>
				{blog.title} by {blog.author}
			</Typography>
			<Typography component='p' variant='body1'>
				This blog was added by <b>{nameOfUser}</b>.
			</Typography>
			<Typography component='p' variant='body1'>
				For more information, see{' '}
				<Link href={blog.url} underline='hover'>
					{blog.url}
				</Link>
				.
			</Typography>
			<Stack direction='row' spacing={1} alignItems='center'>
				<Typography component='p' variant='body1'>
					Number of likes:
				</Typography>
				<Avatar sx={{ bgcolor: purple[500] }}>{blog.likes}</Avatar>
				<Button
					onClick={() => handleLike(blog)}
					variant='outlined'
					color='secondary'
				>
					Like
				</Button>
			</Stack>
			{canRemove && (
				<Button
					onClick={() => deleteBlog(blog)}
					variant='contained'
					color='warning'
					style={{ marginTop: 10, marginBottom: 20 }}
				>
					Delete
				</Button>
			)}
			<CommentSection blog={blog} addComment={handleComment} />
		</div>
	)
}

export default Blog
