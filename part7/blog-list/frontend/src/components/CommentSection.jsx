import React, { useState } from 'react'
import {
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	Typography,
	Stack,
} from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'

const CommentSection = ({ blog, addComment }) => {
	const [comment, setComment] = useState('')

	const handleCommentChange = (event) => {
		setComment(event.target.value)
	}
	const handleSubmit = (event) => {
		event.preventDefault()
		addComment(blog, comment)
		setComment('')
	}
	return (
		<div>
			<Typography component='h3' variant='h6'>
				Comments
			</Typography>
			<List>
				{blog.comments.map((comment, idx) => (
					<ListItem key={`comment${idx}`}>
						<CommentIcon />
						<ListItemText style={{ marginLeft: 10 }}>{comment}</ListItemText>
					</ListItem>
				))}
			</List>
			<form onSubmit={handleSubmit}>
				<Stack spacing={1}>
					<TextField
						type='text'
						id='comment'
						value={comment}
						onChange={handleCommentChange}
						label='New comment'
						color='secondary'
					/>
					<Button type='submit' variant='contained' color='secondary'>
						Send comment
					</Button>
				</Stack>
			</form>
		</div>
	)
}

export default CommentSection
