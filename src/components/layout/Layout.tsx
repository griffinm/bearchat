import { Outlet, Link } from 'react-router-dom';
import { useUser } from '../../providers/UserProvider';
import { useEffect, useState } from 'react';
import { fetchCurrentUser } from '../../utils/ApiClient';
import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import { urls } from '../../utils/urls';
import EditNoteIcon from '@mui/icons-material/EditNote';

const navItems = [
  {
    title: 'Messages',
    icon: <MessageIcon />,
    link: urls.messages.url(),
  },
  {
    title: 'Notes',
    icon: <EditNoteIcon />,
    link: urls.notes.url(),
  },
]

const drawerWidth = 240;

export function Layout() {
  const {
    user,
    setUser,
    setLoading,
  } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const container = window !== undefined ? window.document.body : undefined;

  useEffect(() => {
    if (user) {
      setLoading(false)
      return
    }

    setLoading(true);
    fetchCurrentUser().then((user) => {
      setUser(user.data);
      setLoading(false);
    });
  }, [user, setLoading, setUser]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BearChat
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link to={item.link} key={item.title}>
            <ListItem key={item.title} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                {item.icon}
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ mr: '80px', display: { xs: 'none', sm: 'block' } }}
          >
            BearChat
          </Typography>
          <Box sx={{flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Link to={item.link} key={item.title} className="mr-6">
                <Button key={item.title} sx={{ color: '#fff' }} startIcon={item.icon}>
                  {item.title}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{display: 'flex', verticalAlign: 'middle'}}>
            <PersonIcon sx={{ mr: '0.5rem', fontSize: '2rem' }} />
            <Typography variant="h6" sx={{ color: '#fff', verticalAlign: 'middle'  }}>
              {user?.firstName}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <div className='pt-[70px] p-2'>
        <Outlet />
      </div>
    </div>
  )
}
