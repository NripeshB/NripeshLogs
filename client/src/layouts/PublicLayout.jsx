import { Container } from '@mui/material'

const PublicLayout = ({ children }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {children}
    </Container>
  )
}

export default PublicLayout
