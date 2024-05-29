import { useState, useEffect, createRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'
import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
	const [user, setUser] = useState(null)
	const notificationDispatch = useNotificationDispatch()

	const queryClient = useQueryClient()

	const newBlogMutation = useMutation({
		mutationFn: blogService.create,
		onSuccess: () => queryClient.invalidateQueries(['blogs']),
		onError: () => notify('Adding the blog failed.'),
	})

	const likeMutation = useMutation({
		mutationFn: blogService.update,
		onSuccess: () => queryClient.invalidateQueries('blogs'),
	})

	const deleteMutation = useMutation({
		mutationFn: blogService.remove,
		onSuccess: queryClient.invalidateQueries(['blogs']),
	})

	useEffect(() => {
		const user = storage.loadUser()
		if (user) {
			setUser(user)
		}
	}, [])

	const blogFormRef = createRef()

	const notify = (content) => {
		notificationDispatch({ type: 'SET_MESSAGE', payload: content })
		setTimeout(
			() => notificationDispatch({ type: 'SET_MESSAGE', payload: null }),
			5000
		)
	}

	const handleLogin = async (credentials) => {
		try {
			const user = await loginService.login(credentials)
			setUser(user)
			storage.saveUser(user)
			notify(`Welcome back, ${user.name}`)
		} catch (error) {
			notify('Wrong credentials', 'error')
		}
	}

	const handleCreate = async (blog) => {
		newBlogMutation.mutate(blog)
		notify(`Blog created: ${blog.title} by ${blog.author}`)
		blogFormRef.current.toggleVisibility()
	}

	const handleLike = async (blog) => {
		console.log('updating', blog)
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		likeMutation.mutate(updatedBlog)
		notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`)
	}

	const handleLogout = () => {
		setUser(null)
		storage.removeUser()
		notify(`Bye, ${user.name}!`)
	}

	const handleDelete = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			deleteMutation.mutate(blog.id)
			notify(`Blog ${blog.title} by ${blog.author} removed`)
		}
	}

	const blogQueryResult = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getAll,
	})

	if (!user) {
		return (
			<div>
				<h2>blogs</h2>
				<Notification />
				<Login doLogin={handleLogin} />
			</div>
		)
	}

	if (blogQueryResult.isLoading) {
		return <div>Loading...</div>
	} else if (blogQueryResult.isError) {
		return (
			<div>Blog service is not available due to problems in the server</div>
		)
	} else {
		const blogs = blogQueryResult.data

		const byLikes = (a, b) => b.likes - a.likes

		return (
			<div>
				<h2>blogs</h2>
				<Notification />
				<div>
					{user.name} logged in
					<button onClick={handleLogout}>logout</button>
				</div>
				<Togglable buttonLabel='create new blog' ref={blogFormRef}>
					<NewBlog doCreate={handleCreate} />
				</Togglable>
				{blogs.sort(byLikes).map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						handleLike={handleLike}
						handleDelete={handleDelete}
					/>
				))}
			</div>
		)
	}
}

export default App
