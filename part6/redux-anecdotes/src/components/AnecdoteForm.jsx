import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.addNew(content)
    dispatch(addAnecdote(newAnecdote))
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
