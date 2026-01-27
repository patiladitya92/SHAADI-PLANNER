import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  userId: localStorage.getItem('userId') || null,
  isAuthenticated: false,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, role, userId } = action.payload
      state.token = token
      state.role = role
      state.userId = userId
      state.isAuthenticated = !!token
      state.loading = false
      
      // Persist to localStorage
      if (token) {
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        localStorage.setItem('userId', userId)
      }
    },
    clearCredentials: (state) => {
      state.token = null
      state.role = null
      state.userId = null
      state.isAuthenticated = false
      localStorage.clear()
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setCredentials, clearCredentials, setLoading } = authSlice.actions
export default authSlice.reducer
