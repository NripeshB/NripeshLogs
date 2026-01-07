import { createTheme } from "@mui/material";

const theme = createTheme({
    palette:{
        mode: 'light',
        primary: {
            main: '#1976d2'
        },
        secondary: {
            main: '#9c27b0'
        },
    },
    typography: {
        fontFamily: 'Inter, system-ui, Arial, sans-serif',
    }
})

export default theme