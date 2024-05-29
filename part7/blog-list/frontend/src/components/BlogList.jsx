import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import NewBlog from './NewBlog'

const BlogList = ({ blogs, handleCreate, blogFormRef }) => {
	const byLikes = (a, b) => b.likes - a.likes

	return (
		<div>
			<h2>Blogs</h2>
			<Togglable buttonLabel='Create new blog' ref={blogFormRef}>
				<NewBlog doCreate={handleCreate} />
			</Togglable>
			<ul>
				{blogs.sort(byLikes).map((blog) => (
					<li key={blog.id}>
						<Link
							to={`/blogs/${blog.id}`}
						>{`${blog.title} by ${blog.author}`}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default BlogList
