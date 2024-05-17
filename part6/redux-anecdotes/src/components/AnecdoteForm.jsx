import { useDispatch } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addNew(content))
    dispatch(setNotification(`You added '${content}'`, 3))
  }

  return(
    <div>
      <h2>Add new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
