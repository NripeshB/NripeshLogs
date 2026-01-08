import { Container } from '@mui/material'
import Navbar from '../components/navbar'
const PublicLayout = ({ children }) => {
  return (
    <>
    <Navbar />
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {children}
    </Container>
    </>
  )
}

export default PublicLayout
