import { AppBar, Box, Button, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { AccountCircleOutlined, ArrowDropDown, LogoutOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { useState } from "react";
import { redirect, redirectDocument } from "@remix-run/node";
import theme from "~/theme/theme";
import { useNavigate } from "@remix-run/react";

export default function AppBars({ title }: { title: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    navigate("../logout");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 200,
        justifyContent: "space-between",
        display: "flex",
        flexGrow: 1,
        boxShadow: "none",
        backgroundColor: theme.palette.primary.main,
        color: "#ffffff",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <img src="/assets/logo-white.png" alt="logo" width={150} height="100%" />
        </Box>
        <div>
          <Button
            aria-label="account of current user"
            sx={{ cursor: "pointer", paddingLeft: "1rem" }}
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Typography
              component="label"
              sx={{ marginRight: "0.3rem", cursor: "pointer", textTransform: "capitalize" }}
            >
              {title}
            </Typography>
            <ArrowDropDown />
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            sx={{ top: "3rem", boxShadow: "none" }}
            slotProps={{ paper: { sx: { width: "200px", borderRadius: "16px" }, variant: "outlined", elevation: 0 } }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AccountCircleOutlined fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ShoppingCartOutlined fontSize="small" />
              </ListItemIcon>
              Transactions
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutOutlined fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}