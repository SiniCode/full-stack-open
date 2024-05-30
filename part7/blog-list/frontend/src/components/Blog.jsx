import { useParams, useNavigate } from 'react-router-dom'
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
			<h2>
				{blog.title} by {blog.author}
			</h2>
			<p>
				For more information, see <a href={blog.url}>{blog.url}</a>.
			</p>
			<p>This blog has {blog.likes} likes.</p>
			<button onClick={() => handleLike(blog)}>Like</button>
			<p>This blog was added by {nameOfUser}.</p>
			{canRemove && <button onClick={() => deleteBlog(blog)}>Delete</button>}
			<CommentSection blog={blog} addComment={handleComment} />
		</div>
	)
}

export default Blog
