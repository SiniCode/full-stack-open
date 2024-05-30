import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button
					onClick={toggleVisibility}
					style={{ marginBottom: 15, marginTop: 15 }}
					color='secondary'
					variant='outlined'
				>
					{props.buttonLabel}
				</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<Button onClick={toggleVisibility} color='secondary' variant='outlined'>
					Cancel
				</Button>
			</div>
		</div>
	)
})

Togglable.displayName = 'Togglable'

export default Togglable
