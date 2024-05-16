import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(anecdote))
    dispatch(setNotification(`You added '${anecdote}'`))
    setTimeout(() => dispatch(setNotification(null)), 5000)
  }

  return(
    <div>
      <h2>Add new anecdote</h2>
      <form onSubmit={addNew}>
        <div><input name='anecdote'/></div>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
