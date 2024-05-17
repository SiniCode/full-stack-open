import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const anecdote = action.payload
      //const id = action.payload.id
      //const selected = state.find(anecdote => anecdote.id === id)
      const updated = { ...anecdote, votes: anecdote.votes + 1 }
      const updatedState = state.map(a =>
        a.id !== anecdote.id ? a : updated
      )
      return updatedState
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, vote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.addNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.update(anecdote.id, updatedAnecdote)
    dispatch(vote(anecdote))
  } 
}

export default anecdoteSlice.reducer
