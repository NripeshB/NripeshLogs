import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(170, 0, 200)',
    },
    secondary: {
      main: '#630072',
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
