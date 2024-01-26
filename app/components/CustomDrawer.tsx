import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useHref } from "@remix-run/react";

const drawerWidth = 260;
export function CustomDrawer({ children }: { children: React.ReactNode }) {
  return (
    <Drawer
      variant="permanent"
      component="nav"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 100,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>{children}</Box>
    </Drawer>
  );
}

export function ListItems({
  text,
  href,
  children,
  selected = false,
}: {
  text: string;
  href: string;
  children: React.ReactNode;
  selected: boolean;
}) {
  const hreff = useHref(href);
  return (
    <ListItem disablePadding>
      <ListItemButton href={hreff} selected={selected}>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
