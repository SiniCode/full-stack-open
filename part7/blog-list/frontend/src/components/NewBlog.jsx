import React, { useState } from 'react'
import { TextField, Typography, Button, Stack } from '@mui/material'

const NewBlog = ({ doCreate }) => {
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [author, setAuthor] = useState('')

	const handleTitleChange = (event) => {
		setTitle(event.target.value)
	}

	const handleUrlChange = (event) => {
		setUrl(event.target.value)
	}

	const handleAuthorChange = (event) => {
		setAuthor(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		doCreate({ title, url, author })
		setAuthor('')
		setTitle('')
		setUrl('')
	}

	return (
		<div>
			<Typography component='h3' variant='h5' style={{ marginTop: 20 }}>
				Create New Blog
			</Typography>
			<form onSubmit={handleSubmit}>
				<Stack spacing={2} maxWidth={400} marginTop={2}>
					<TextField
						color='secondary'
						id='title'
						label='Title'
						variant='outlined'
						type='text'
						value={title}
						onChange={handleTitleChange}
					/>
					<TextField
						color='secondary'
						id='url'
						label='URL'
						variant='outlined'
						type='text'
						value={url}
						onChange={handleUrlChange}
					/>
					<TextField
						color='secondary'
						id='author'
						label='Author'
						variant='outlined'
						type='text'
						value={author}
						onChange={handleAuthorChange}
					/>
					<Button
						type='submit'
						variant='contained'
						color='secondary'
						style={{ marginBottom: 10 }}
					>
						Create
					</Button>
				</Stack>
			</form>
		</div>
	)
}

export default NewBlog
