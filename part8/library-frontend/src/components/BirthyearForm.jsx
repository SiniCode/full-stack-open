import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { SET_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const BirthyearForm = (props) => {
	const [name, setName] = useState(null)
	const [birthyear, setBirthyear] = useState('')

	const [addBirthyear, result] = useMutation(SET_BIRTHYEAR, {
		refetchQueries: [ALL_AUTHORS],
		onError: (error) => {
			const messages = error.graphQLErrors.map((e) => e.message).join('\n')
			props.notify(messages)
		},
	})

	useEffect(() => {
		if (result.data && result.data.editAuthor === null) {
			props.notify('Author not found')
		}
	}, [result.data])

	const submit = (event) => {
		event.preventDefault()
		if (!name) {
			props.notify('Name is required')
		} else if (!birthyear) {
			props.notify('Birthyear is required')
		} else {
			addBirthyear({ variables: { name: name.value, born: Number(birthyear) } })
			setName(null)
			setBirthyear('')
		}
	}

	return (
		<div>
			<h3>Set Author's Birthyear</h3>
			<form onSubmit={submit}>
				<Select
					defaultValue={name}
					onChange={setName}
					options={props.authors}
				/>
				<div>
					Birthyear:
					<input
						value={birthyear}
						onChange={({ target }) => setBirthyear(target.value)}
					/>
				</div>
				<button type='submit'>Save</button>
			</form>
		</div>
	)
}

export default BirthyearForm
