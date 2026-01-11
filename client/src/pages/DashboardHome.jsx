import { Typography, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { isAdmin } from '../utils/permission'

const DashboardHome = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Welcome, {user.username}</Typography>

      {isAdmin(user) ? (
        <Typography>
          You have admin access. You can manage users and content.
        </Typography>
      ) : (
        <Typography>
          Manage your blogs and articles from the dashboard.
        </Typography>
      )}
    </Stack>
  )
}

export default DashboardHome
