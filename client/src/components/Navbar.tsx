import React from "react";
import styles from "../styles/nav.module.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import AlertDismissable from "./Alert";
import { logout } from "../features/user/userSlice";
import { appActions } from "../features/appSlice";

const pages = ['Blog'];

function Navbar() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const {setAlert} = appActions;
  
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const settings = [
    {
      value: 'Profile',
      method: () => {
        navigate("/profile");
      }
    },
    {
      value: 'Logout',
      method: () => {
        dispatch(logout()).unwrap()
        .then((res) => {
          navigate("/auth/login", {replace: true});
          handleCloseUserMenu();
        })
        .catch((err) => {
          setAlert({show: true, message: err.response.data.message});
          handleCloseUserMenu();
        })
      } 
    }
  ];
  


  return (
    <>
      <AlertDismissable />
      <AppBar position="static" className={styles.navbar_blur} style={{backgroundColor: "pink", color: "black", position: "sticky"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="body2"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                scale: 0.8
              }}
            >
              <img src="/images/logo2.png" width={"50px"}></img>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  color: "white"
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu} color="black">
                    <Typography textAlign="center" color="black">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Stack sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <img src = "/images/logo2.png" style = {{width: "40px"}} />
            </Stack>
            <Typography
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.05rem',
                color: "black",
                textDecoration: 'none',
              }}
            >
              WildAid
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {
              user.loggedIn 
              ? 
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {
                      user.image
                      ?
                      <img src = {user.image} style = {{width: "45px", height: "45px", borderRadius: "100%", backgroundSize: "cover"}} />
                      :
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    }
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.value} onClick={setting.method}>
                      <Typography textAlign="center">{setting.value}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              :
              <MenuItem onClick={() => {navigate("/auth/login")}}>
                <Typography textAlign="center" color="black">LOGIN</Typography>
              </MenuItem>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Navbar;
