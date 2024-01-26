import { Divider, List, ListItem, Typography } from "@mui/material";
import { CustomDrawer, ListItems } from "~/components/CustomDrawer";
import {
  AddShoppingCartOutlined,
  DashboardOutlined,
  Inventory2Outlined,
  PeopleOutline,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useLocation } from "@remix-run/react";

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const getpath = pathname.split("/");
  return (
    <CustomDrawer>
      <List>
        <ListItem>
          <Typography fontSize="small" color="grayText">
            GOPOS
          </Typography>
        </ListItem>
        <ListItems selected={getpath[1] == "" && true} href="/" text="Dashboard">
          <DashboardOutlined />
        </ListItems>
        <ListItems selected={getpath[1] == "purchase" && true} href="/purchase" text="New Transactions">
          <AddShoppingCartOutlined />
        </ListItems>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Typography fontSize="small" color="grayText">
            MANAGE
          </Typography>
        </ListItem>
        <ListItems selected={getpath[1] == "users" && true} href="/" text="Users">
          <PeopleOutline />
        </ListItems>
        <ListItems selected={getpath[1] == "products" && true} href="/products" text="Products">
          <Inventory2Outlined />
        </ListItems>
        <ListItems selected={getpath[1] == "transactions" && true} href="/transactions" text="Transactions">
          <ShoppingCartOutlined />
        </ListItems>
      </List>
    </CustomDrawer>
  );
}
