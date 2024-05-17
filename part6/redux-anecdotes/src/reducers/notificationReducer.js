import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setText(state, action) {
      return(action.payload)
    }
  }
})

export const { setText } = notificationSlice.actions

export const setNotification = (text, duration) => {
  return (dispatch) => {
    dispatch(setText(text))
    setTimeout(() => dispatch(setText(null)), duration*1000)
  }
}

export default notificationSlice.reducer
