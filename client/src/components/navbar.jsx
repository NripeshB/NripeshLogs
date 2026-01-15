import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
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
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Toolbar sx={{ minHeight: 72 }}>
        {/* Desktop Navigation */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {['/', '/blogs', '/authors'].map((path, idx) => (
            <Button
              key={path}
              component={Link}
              to={path}
              sx={{
                color: 'white',
                px: 2,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              {['Home', 'Blogs', 'Authors'][idx]}
            </Button>
          ))}
        </Stack>

        {/* Desktop Auth Buttons */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          {!token ? (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2.5,
                }}
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                  fontWeight: 600,
                }}
              >
                Signup
              </Button>
            </>
          ) : (
            <>
              {isAuthor(user) && (
                <Button
                  component={Link}
                  to="/dashboard"
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 3,
                    fontWeight: 600,
                  }}
                >
                  Dashboard
                </Button>
              )}

              <Button
                onClick={handleLogout}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.08)',
                  },
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Stack>

        {/* Mobile Hamburger */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              color: 'white',
              borderRadius: 2,
            }}
          >
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
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 3,
              minWidth: 200,
              backgroundColor: 'rgba(30,30,30,0.95)',
              backdropFilter: 'blur(8px)',
            },
          }}
        >
          {[
            { label: 'Home', to: '/' },
            { label: 'Blogs', to: '/blogs' },
            { label: 'Authors', to: '/authors' },
          ].map((item) => (
            <MenuItem
              key={item.to}
              component={Link}
              to={item.to}
              onClick={handleMenuClose}
              sx={{ py: 1.2 }}
            >
              {item.label}
            </MenuItem>
          ))}

          {!token && (
            <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
              Login
            </MenuItem>
          )}

          {!token && (
            <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>
              Signup
            </MenuItem>
          )}

          {token && isAuthor(user) && (
            <MenuItem
              component={Link}
              to="/dashboard"
              onClick={handleMenuClose}
            >
              Dashboard
            </MenuItem>
          )}

          {token && (
            <MenuItem
              onClick={() => {
                handleLogout()
                handleMenuClose()
              }}
            >
              Logout
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
