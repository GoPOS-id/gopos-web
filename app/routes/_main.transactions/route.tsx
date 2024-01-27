import { Box, Stack } from "@mui/material";
import { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "Transactions - GoPOS" },
    {
      name: "description",
      content:
        "GoPOS is a POS application that revolutionizes retail business management. With an intuitive interface and advanced features, GoPOS provides an efficient and comprehensive user experience to enhance operational effectiveness and business growth.",
    },
  ];
};

export default function Index() {
  return (
    <>
      <Header title="transactions" desc="Make your transactions easily." />
    </>
  );
}
