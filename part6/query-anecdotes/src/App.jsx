import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, vote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: vote,
    onSuccess: () =>  queryClient.invalidateQueries('anecdotes')
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
  }

  const queryResult = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })

  if (queryResult.isLoading) {
    return <div>Loading...</div>
  } else if (queryResult.isError) {
    return <div>Anecdote service not available due to problems in the server</div>
  } else {
    const anecdotes = queryResult.data

    return (
      <div>
        <h3>Anecdote app</h3>
    
        <Notification />
        <AnecdoteForm />
    
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }  
}

export default App
