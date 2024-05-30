import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect, createRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'
import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import NavBar from './components/NavBar'

const App = () => {
	const [user, setUser] = useState(null)
	useEffect(() => {
		const user = storage.loadUser()
		if (user) {
			setUser(user)
		}
	}, [])

	const notificationDispatch = useNotificationDispatch()
	const notify = (content) => {
		notificationDispatch({ type: 'SET_MESSAGE', payload: content })
		setTimeout(
			() => notificationDispatch({ type: 'SET_MESSAGE', payload: null }),
			5000
		)
	}

	const blogFormRef = createRef()
	const queryClient = useQueryClient()

	const newBlogMutation = useMutation({
		mutationFn: blogService.create,
		onSuccess: () => queryClient.invalidateQueries(['blogs']),
		onError: () => notify('Adding the blog failed.'),
	})

	const updateMutation = useMutation({
		mutationFn: blogService.update,
		onSuccess: () => queryClient.invalidateQueries(['blogs']),
	})

	const deleteMutation = useMutation({
		mutationFn: blogService.remove,
		onSuccess: queryClient.invalidateQueries(['blogs']),
	})

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
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		updateMutation.mutate(updatedBlog)
		notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`)
	}

	const handleComment = async (blog, comment) => {
		const updatedBlog = { ...blog, comments: blog.comments.concat(comment) }
		updateMutation.mutate(updatedBlog)
	}

	const handleLogout = () => {
		setUser(null)
		storage.removeUser()
		notify(`Bye, ${user.name}!`)
	}

	const handleDelete = async (blog) => {
		if (window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
			deleteMutation.mutate(blog.id)
			notify(`Blog ${blog.title} by ${blog.author} deleted`)
			return true
		}
		return false
	}

	const blogQueryResult = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getAll,
	})

	if (blogQueryResult.isLoading) {
		return <div>Loading...</div>
	} else if (blogQueryResult.isError) {
		return (
			<div>Blog service is not available due to problems in the server</div>
		)
	} else {
		const blogs = blogQueryResult.data

		return (
			<BrowserRouter>
				{user && <NavBar user={user} logout={handleLogout} />}
				<h1>Blog List App</h1>
				<Notification />
				<Routes>
					<Route
						path='/'
						element={
							user ? (
								<BlogList
									blogs={blogs}
									handleCreate={handleCreate}
									blogFormRef={blogFormRef}
								/>
							) : (
								<Login doLogin={handleLogin} />
							)
						}
					/>
					<Route
						path='/blogs/:id'
						element={
							<Blog
								blogs={blogs}
								handleLike={handleLike}
								handleDelete={handleDelete}
								handleComment={handleComment}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		)
	}
}

export default App
