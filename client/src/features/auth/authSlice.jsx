import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from '../../api/auth.api'

// Reads the persisted auth token from localStorage on app load
const tokenFromStorage = localStorage.getItem('token')

// Async thunk that logs in a user using provided credentials
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    return await authApi.login(credentials)
  }
)

// Async thunk that registers a new user
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (payload) => {
    return await authApi.signup(payload)
  }
)

// Async thunk that fetches the currently authenticated user's data
export const fetchMe = createAsyncThunk(
  'auth/me',
  async () => {
    return await authApi.getMe()
  }
)

const authSlice = createSlice({
  // Defines the slice name used in Redux state and action types
  name: 'auth',

  // Sets the initial authentication state for the application
  initialState: {
    user: null,
    token: tokenFromStorage,
    status: 'idle',
    error: null,
    hydrated: false,
  },

  reducers: {
    // Clears auth state and removes token when the user logs out
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
  },

  extraReducers: (builder) => {
    builder
      // Stores user data and token when login succeeds
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
        localStorage.setItem('token', action.payload.token)
      })

      // Stores user data and token when signup succeeds
      .addCase(signupUser.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
        localStorage.setItem('token', action.payload.token)
      })

      // Updates user state after successfully fetching current user info
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload
        state.hydrated = true
      })

      // Resets auth state if fetching user fails (e.g., invalid or expired token)
      .addCase(fetchMe.rejected, (state) => {
        state.hydrated = true
        state.user = null
        state.token = null
        localStorage.removeItem('token')
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message || 'Login failed'
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.error.message || 'Signup failed'
      })

  },
})

// Exports the logout action for use in components
export const { logout } = authSlice.actions

// Exports the reducer to be registered in the Redux store
export default authSlice.reducer
