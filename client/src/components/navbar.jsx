import { AppBar, Toolbar, Button, Stack, Box, IconButton, Menu, MenuItem} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { isAuthor } from '../utils/permission'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'


const Navbar = () => {
   const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

    return (
    <AppBar position="static">
      <Toolbar>
        {/* Desktop Navigation */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/blogs">
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/authors">
            Authors
          </Button>
        </Stack>

        {/* Desktop Auth Buttons */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          {!token ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          ) : (
            <>
              {isAuthor(user) && (
                <Button color="inherit" component={Link} to="/dashboard">
                  Dashboard
                </Button>
              )}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Stack>

        {/* Mobile Hamburger */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu */}
        <Menu
  anchorEl={anchorEl}
  open={open}
  onClose={handleMenuClose}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
>
  {[
    <MenuItem key="home" component={Link} to="/" onClick={handleMenuClose}>
      Home
    </MenuItem>,

    <MenuItem key="blogs" component={Link} to="/blogs" onClick={handleMenuClose}>
      Blogs
    </MenuItem>,

    <MenuItem key="authors" component={Link} to="/authors" onClick={handleMenuClose}>
      Authors
    </MenuItem>,

    !token && (
      <MenuItem
        key="login"
        component={Link}
        to="/login"
        onClick={handleMenuClose}
      >
        Login
      </MenuItem>
    ),

    !token && (
      <MenuItem
        key="signup"
        component={Link}
        to="/signup"
        onClick={handleMenuClose}
      >
        Signup
      </MenuItem>
    ),

    token && isAuthor(user) && (
      <MenuItem
        key="dashboard"
        component={Link}
        to="/dashboard"
        onClick={handleMenuClose}
      >
        Dashboard
      </MenuItem>
    ),

    token && (
      <MenuItem
        key="logout"
        onClick={() => {
          handleLogout()
          handleMenuClose()
        }}
      >
        Logout
      </MenuItem>
    ),
  ].filter(Boolean)}
</Menu>

      </Toolbar>
    </AppBar>
  )

}

export default Navbar
