import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from '../../api/auth.api'

const tokenFromStorage = localStorage.getItem('token')

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authApi.login(credentials)
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Invalid credentials')
    }
  }
)

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.signup(payload)
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Signup failed')
    }
  }
)

export const fetchMe = createAsyncThunk('auth/me', authApi.getMe)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: tokenFromStorage,
    status: 'idle',
    error: null,
    hydrated: false,
  },
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
      localStorage.removeItem('token')
    },
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        state.user = action.payload.user
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        state.user = action.payload.user
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload
        state.hydrated = true
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null
        state.token = null
        state.hydrated = true
        localStorage.removeItem('token')
      })
  },
})

export const { logout, clearAuthError } = authSlice.actions
export default authSlice.reducer
