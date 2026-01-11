import { Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material'
import { isAdmin } from '../utils/permission'

const drawerWidth = 220

const DashboardLayout = () => {
  const { user, hydrated } = useSelector((state) => state.auth)

  if (!hydrated) return null
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Top bar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
    Dashboard
  </Typography>

  <Button color="inherit" component={Link} to="/">
    View Site
  </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemText primary="Overview" />
          </ListItem>

          <ListItem button component={Link} to="/dashboard/blogs">
            <ListItemText primary="My Blogs" />
          </ListItem>

          <ListItem button component={Link} to="/dashboard/articles/new">
            <ListItemText primary="New Article" />
          </ListItem>

          {isAdmin(user) && (
            <ListItem button component={Link} to="/admin">
              <ListItemText primary="Admin Panel" />
            </ListItem>
          )}
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default DashboardLayout
