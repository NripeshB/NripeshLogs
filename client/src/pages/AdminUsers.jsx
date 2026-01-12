import { useEffect, useState } from 'react'
import { getAllUsers, updateUserRole } from '../api/users.api'
import {
  Stack,
  Typography,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider
} from '@mui/material'

const roles = ['user', 'author', 'admin']

const AdminUsers = () => {
  const [users, setUsers] = useState([])

  const load = async () => {
    const data = await getAllUsers()
    setUsers(data)
  }

  useEffect(() => {
    load()
  }, [])

  const handleRoleChange = async (userId, newRole, currentRole) => {
    if (newRole === currentRole) return

    await updateUserRole(userId, newRole)
    load()
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={600}>
        User Management
      </Typography>

      {users.map(user => (
        <Card key={user.id}>
          <CardContent>
            <Stack spacing={2}>
              <Stack>
                <Typography variant="h6">{user.username}</Typography>
                <Typography color="text.secondary">
                  Current role: {user.role}
                </Typography>
              </Stack>

              <Divider />

              <RadioGroup
                row
                value={user.role}
                onChange={(e) =>
                  handleRoleChange(user.id, e.target.value, user.role)
                }
              >
                {roles.map(role => (
                  <FormControlLabel
                    key={role}
                    value={role}
                    control={<Radio />}
                    label={role.charAt(0).toUpperCase() + role.slice(1)}
                  />
                ))}
              </RadioGroup>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}

export default AdminUsers
