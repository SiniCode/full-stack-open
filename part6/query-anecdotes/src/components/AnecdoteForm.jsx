import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNew } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: addNew,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
