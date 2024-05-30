import React, { useState } from 'react'

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
			<h3>Comments</h3>
			<ul>
				{blog.comments.map((comment, idx) => (
					<li key={`comment${idx}`}>{comment}</li>
				))}
			</ul>
			<form onSubmit={handleSubmit}>
				<label>New comment:</label>
				<input
					type='text'
					data-testid='comment'
					value={comment}
					onChange={handleCommentChange}
				/>
				<button type='submit'>Send comment</button>
			</form>
		</div>
	)
}

export default CommentSection
