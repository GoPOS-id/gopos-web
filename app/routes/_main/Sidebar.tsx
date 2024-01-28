import { List, ListItem, Typography } from "@mui/material";
import { CustomDrawer, ListItems } from "~/components/CustomDrawer";
import { AddShoppingCartOutlined, AssessmentOutlined, DashboardOutlined, Inventory2Outlined, PeopleOutline, ShoppingBagOutlined, ShoppingCartOutlined } from "@mui/icons-material";
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
        <ListItems text="Dashboard" icon={DashboardOutlined} href="/" />
        <ListItems text="Orders" icon={ShoppingBagOutlined} href="/orders" />
      </List>
      <List>
        <ListItem>
          <Typography fontSize="small" color="grayText">
            MANAGE
          </Typography>
        </ListItem>
        <ListItems text="Users" icon={PeopleOutline} href="/users" />
        <ListItems text="Products" icon={Inventory2Outlined} href="/products" />
        <ListItems text="Reports" icon={AssessmentOutlined} href="/report" />
      </List>
    </CustomDrawer>
  );
}
