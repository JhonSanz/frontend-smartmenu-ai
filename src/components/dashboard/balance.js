"use client";

import Grid from "@mui/material/Grid";
import {
  gridCardStyle,
  gridContainerStyle,
} from "@/components/dashboard/dashboardStyles";
import DashboardCard from "./cardBalance";


export default function Balance({ profit = "50", loss = "50", amountClients }) {
  const total = Number(profit) - Number(loss);

  const cardsList = [
    {
      title: "INGRESOS",
      cardSx: { minWidth: 125, height: 90, color: "#004d40" },
      content: `$ ${profit}`,
    },
    {
      title: "EGRESOS",
      cardSx: { minWidth: 125, height: 90, color: "#b71c1c" },
      content: `$ -${loss}`,
    },
    {
      title: "TOTAL",
      cardSx: { minWidth: 125, height: 90 },
      content: `$ ${total}`,
    },
    {
      title: "CLIENTES",
      cardSx: { minWidth: 125, height: 90 },
      content: amountClients,
    },
  ]

  return (
    <>
      <Grid container {...gridContainerStyle}>
        {
          cardsList.map(item =>
            <Grid item {...gridCardStyle} key={item.title}>
              <DashboardCard {...item} />
            </Grid>
          )
        }
      </Grid>
    </>
  );
}
