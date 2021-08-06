import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createTheme, styled, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import LogoutRoundedIcon from '@material-ui/icons/LogoutRounded';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';
import * as React from 'react';
import MaterialUISwitch from '../theme-toggle/ThemeToggle';
import AppBarButtons from './AppBarButtons';
import AccountMenu from './Profile';
import PrivacyPopUp from '../privacy/Privacy';

const drawerWidth = 240;

function ElevationScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    w: PropTypes.func,
};
const RightToolbar = styled('div')({
    marginLeft: 'auto',
    marginRight: -5,
});
const lightTheme = createTheme({ palette: { mode: 'light' } });
const darkTheme = createTheme({ palette: { mode: 'dark' } });
function ResponsiveDrawer(props) {
    const { window, auth } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const themeState = localStorage.getItem('darkMode');
    const [darkMode, setThemeMode] = React.useState(
        themeState && themeState === 'dark' ? true : false,
    );
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawer = (
        <>
            <Toolbar />

            <List>
                <ListItem
                    key="account-menu"
                    sx={{
                        pb: 4,
                    }}
                >
                    <AccountMenu user={auth.currentUser} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem
                    button
                    key="logout-menu"
                    onClick={() => auth.signOut()}
                >
                    <ListItemIcon>
                        <LogoutRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                </ListItem>

                <ListItem button key="settings-menu">
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
            <Divider />
            <PrivacyPopUp />

            <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} checked={darkMode} />}
                label={darkMode ? 'Dark Theme' : 'Light Theme'}
                sx={{ mx: 'auto', width: '100%', pl: 2.7, pt: 1 }}
                style={{ position: 'absolute' }}
                onChange={(e) => {
                    setThemeMode(e.target.checked);
                    localStorage.setItem(
                        'darkMode',
                        e.target.checked ? 'dark' : 'light',
                    );
                }}
            />
        </>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <ElevationScroll {...props}>
                    <AppBar
                        position="fixed"
                        sx={{
                            width: { sm: `calc(100% - ${drawerWidth}px)` },
                            ml: { sm: `${drawerWidth}px` },
                        }}
                    >
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
                            <Typography variant="h6" noWrap component="div">
                                ⚛️ React FireChat
                            </Typography>
                            <RightToolbar>
                                <AppBarButtons />
                            </RightToolbar>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
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
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                            },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    {props.main}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
