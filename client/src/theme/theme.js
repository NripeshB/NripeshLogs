import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3a3a3aff',
    },
    secondary: {
      main: '#682f71',
    },
    background: {
      default: '#0f1216',
      paper: '#151a21',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b8c4',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Arial, sans-serif',
  },
})

export default theme
