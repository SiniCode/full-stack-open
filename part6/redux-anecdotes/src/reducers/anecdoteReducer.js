import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload.id
      const selected = state.find(anecdote => anecdote.id === id)
      const updated = { ...selected, votes: selected.votes + 1 }
      const updatedState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : updated
      )
      return updatedState
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
