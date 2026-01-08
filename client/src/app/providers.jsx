import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './store'
import theme from '../theme/theme'

const Providers = ({ children }) => {
  return (
    // Supplies the Redux store to the entire React app
    <Provider store={store}>
      {/* Enables routing for all nested components */}
      <BrowserRouter>
        {/* Applies the global Material UI theme */}
        <ThemeProvider theme={theme}>
          {/* Normalizes default browser styles */}
          <CssBaseline />
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default Providers
