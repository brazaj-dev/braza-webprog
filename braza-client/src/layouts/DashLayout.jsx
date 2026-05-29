import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArticleIcon from "@mui/icons-material/Article";

const drawerWidth = 240;
const allDashboardNavItems = [
  {
    label: "Dashboard",
    title: "Dashboard",
    to: "/dashboard",
    icon: DashboardIcon,
    requiredRole: ["admin", "editor"], // Admins and editors can access dashboard
  },
  {
    label: "Reports",
    title: "Reports",
    to: "/dashboard/reports",
    icon: AssessmentIcon,
    requiredRole: ["admin", "editor"], // Admins and editors can access reports
  },
  {
    label: "Users",
    title: "Users",
    to: "/dashboard/users",
    icon: PeopleIcon,
    requiredRole: ["admin"], // Admins only
  },
  {
    label: "Articles",
    title: "Articles",
    to: "/dashboard/articles",
    icon: ArticleIcon,
    requiredRole: ["admin", "editor"], // Admins and editors can access articles
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: theme.spacing(7) + 1,
  [theme.breakpoints.up("sm")]: {
    width: theme.spacing(8) + 1,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    width: drawerWidth,
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      width: drawerWidth,
    },
  }),
  ...(!open && {
    width: theme.spacing(7) + 1,
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      width: theme.spacing(7) + 1,
    },
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#0b74da",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.18),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const getPageTitle = (pathname) => {
  const match = allDashboardNavItems.find(({ to }) => pathname.startsWith(to));
  return match?.title ?? "Dashboard";
};

const DashLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const userType = localStorage.getItem("type") || "viewer";
  const dashboardNavItems = allDashboardNavItems.filter((item) =>
    item.requiredRole.includes(userType),
  );
  const pageTitle = getPageTitle(location.pathname);

  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("type");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");

    // Navigate to home
    navigate("/");
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={drawerOpen}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {pageTitle}
            </Typography>
            {/* Search */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "rgba(255,255,255,0.75)" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
                sx={{ color: "#fff", width: { xs: "10rem", sm: "14rem" } }}
              />
            </Search>
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleLogout}
              sx={{
                borderColor: "rgba(255,255,255,0.7)",
                color: "#fff",
                textTransform: "none",
              }}
            >
              LOGOUT
            </Button>
          </Toolbar>
        </AppBar>
        {/* Drawer */}
        <Drawer variant="permanent" open={drawerOpen}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: 1,
              py: 1,
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
          <List>
            {dashboardNavItems.map((item) => {
              const NavIcon = item.icon;
              return (
                <ListItem key={item.to} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.to}
                    selected={location.pathname === item.to}
                    sx={{
                      px: drawerOpen ? 2 : 1,
                      py: 1.5,
                      justifyContent: drawerOpen ? "flex-start" : "center",
                      "&.Mui-selected": {
                        backgroundColor: "primary.light",
                        color: "primary.main",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        justifyContent: "center",
                        color: "inherit",
                      }}
                    >
                      <NavIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{
                        display: drawerOpen ? "block" : "none",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
          {/* Content */}
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashLayout;
