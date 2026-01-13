import { Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { isAdmin } from '../utils/permission'
import { useState } from 'react'

const drawerWidth = 220

const DashboardLayout = () => {
  const { user, hydrated } = useSelector((state) => state.auth)
  const [mobileOpen, setMobileOpen] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  if (!hydrated) return null

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev)
  }

  const drawerContent = (
    <>
      <Toolbar />
      <List>
        <ListItemButton component={Link} to="/dashboard" onClick={handleDrawerToggle}>
          <ListItemText primary="Overview" />
        </ListItemButton>

        {!isAdmin(user) && (
          <ListItemButton component={Link} to="/dashboard/blogs" onClick={handleDrawerToggle}>
            <ListItemText primary="My Blogs" />
          </ListItemButton>
        )}

        {!isAdmin(user) && (
          <ListItemButton component={Link} to="/dashboard/blogs/new" onClick={handleDrawerToggle}>
            <ListItemText primary="New Blog" />
          </ListItemButton>
        )}

        {!isAdmin(user) && (
          <ListItemButton component={Link} to="/dashboard/articles/new" onClick={handleDrawerToggle}>
            <ListItemText primary="New Article" />
          </ListItemButton>
        )}

        {isAdmin(user) && (
          <ListItemButton component={Link} to="/admin/users" onClick={handleDrawerToggle}>
            <ListItemText primary="Admin Panel" />
          </ListItemButton>
        )}
      </List>
    </>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>

          <Button color="inherit" component={Link} to="/">
            View Site
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default DashboardLayout
