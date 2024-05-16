import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => dispatch(setNotification(null)), 5000)
  }

  const anecdotes = useSelector(state => state.anecdotes
    .filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    .sort((a1, a2) => a2.votes - a1.votes)
  )

  return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voteAnecdote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList
