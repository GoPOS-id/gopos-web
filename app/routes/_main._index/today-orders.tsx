import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Badge from "~/components/Badge";
import { CardWidget } from "~/components/Widget";
import defaultTheme from "~/theme/theme";
import { formatDate, formatNumber } from "~/utils/formatUtils";

function createData(orderID: string, dateTime: string, invoice: string, cashier: string, payment: string, amount: number, status: number) {
  return { orderID, dateTime, invoice, cashier, payment, amount, status };
}

const rows = [
  createData("001", "29 Jan 2024 08:55", "20240129085501", "Acep Pardidi", "Cash", 80000, 1),
  createData("002", "29 Jan 2024 09:55", "20240129095502", "Jajat Knalpot", "Cash", 50000, 2),
  createData("003", "29 Jan 2024 10:55", "20240129105503", "Dadang Sutarman", "Cash", 650000, 2),
  createData("004", "29 Jan 2024 11:55", "20240129115504", "Acep Pardidi", "Cash", 1000000, 1),
];

export default function TodayOrders() {
  return (
    <CardWidget sx={{ width: "100%", marginTop: 2 }}>
      <Typography fontSize="large" color="text.primary" fontWeight="bold">
        Today Orders
      </Typography>
      <TableContainer component="div">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ textAlign: "start" }}>
              <TableCell>Order ID</TableCell>
              <TableCell>No. Invoice</TableCell>
              <TableCell>Date Time</TableCell>
              <TableCell>Cashier</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.invoice} sx={{ "&:last-child td, &:last-child th": { border: 0 }, color: defaultTheme.palette.text.secondary }}>
                <TableCell component="th" scope="row">
                  #{row.orderID}
                </TableCell>
                <TableCell component="td" scope="row">
                  INV-{row.invoice}
                </TableCell>
                <TableCell component="td" scope="row">
                  {row.dateTime}
                </TableCell>
                <TableCell component="td" scope="row">
                  {row.cashier}
                </TableCell>
                <TableCell component="td" scope="row">
                  {row.payment}
                </TableCell>
                <TableCell component="td" scope="row" align="center">
                  {row.status == 1 ? (
                    <Badge color="success" py="5px">
                      Paid
                    </Badge>
                  ) : (
                    <Badge color="warning" py="5px">
                      Unpaid
                    </Badge>
                  )}
                </TableCell>
                <TableCell component="td" scope="row">
                  Rp. {formatNumber(row.amount.toString())}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardWidget>
  );
}
