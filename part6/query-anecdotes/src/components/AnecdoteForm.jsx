import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNew } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const showNotification = (content) => {
    notificationDispatch({ type: 'SET_MESSAGE', payload: content })
    setTimeout(() => notificationDispatch({ type: 'SET_MESSAGE', payload: null}), 5000)
  }

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: addNew,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
    onError: () => showNotification('The minimum length of an anecdote is 5.')
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
    showNotification(`You added: '${content}'`)
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
