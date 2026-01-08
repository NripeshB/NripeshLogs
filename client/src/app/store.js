import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'


// Creates the global Redux store and registers application reducers
export const store = configureStore({
  reducer: {
    // Mounts the auth reducer under the "auth" key in the Redux state
    auth: authReducer,
  },
})

export default store
