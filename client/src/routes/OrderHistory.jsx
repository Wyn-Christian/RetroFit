import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { http } from "../http";
import { peso } from "../peso";

export async function orderHistoryLoader() {
  let order_history = await http
    .get("/orders")
    .then((result) => result.data);

  console.log(order_history);
  return order_history;
}

function Row({ date, total_quantity, total_price, order_items }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {date}
        </TableCell>
        <TableCell align="right">{total_quantity}</TableCell>
        <TableCell align="right">{peso.format(total_price)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Checkout Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order_items.map((item) => (
                    <TableRow key={item.product.name}>
                      <TableCell component="th" scope="row">
                        <Typography fontWeight="bold">
                          {item.product.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {peso.format(item.product.price)}
                      </TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                        {peso.format(item.total_price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function OrderHistory() {
  let result = useLoaderData();
  return (
    <Container>
      <Typography
        variant="h1"
        fontWeight="bold"
        textAlign="center"
        sx={{ m: "20px 0 50px" }}
      >
        Order History
      </Typography>
      <TableContainer component={Paper} elevation={5}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Date</TableCell>
              <TableCell align="right">Total Quantity</TableCell>
              <TableCell align="right">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((row) => (
              <Row key={row._id} {...row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default OrderHistory;
