"use client";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import Grid from "@mui/material/Grid";
import {
  gridChartStyle,
  gridContainerChartStyle,
  gridBarChartStyle,
} from "./dashboardStyles";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import { ChartsReferenceLine } from '@mui/x-charts';

export default function Charts({
  profit = "0",
  loss = "0",
  expenses = [{ id: 0, value: 0, label: "no_data", color: "#cfd8dc" }],
  detail = { topYdata: [0], botYdata: [0], xLabels: ["no data"], total: [0] },
}) {
  return (
    <Box p={3}>
      <Grid container {...gridContainerChartStyle}>
        <Grid item {...gridBarChartStyle}>
          <Box p={3}>
            <Box bgcolor={"white"} p={2} borderRadius={5}>
              <Typography sx={{ fontSize: 16, mb: 5 }} color="#757575">
                LineChart
              </Typography>
              <LineChart
                height={300}
                series={[
                  {
                    data: detail.total,
                    label: "Ganancia neta",
                    color: "#4db6ac",
                  },
                ]}
                xAxis={[{ data: detail.xLabels, scaleType: "point" }]}
              >
                <ChartsReferenceLine y={(detail.total.reduce((rec, valor) => rec + valor, 0))/ detail.total.length} label="Promedio" lineStyle={{ stroke: '#2196f3' }} />
                <ChartsReferenceLine y={0}  lineStyle={{ stroke: '#e0e0e0' }} />
              </LineChart>
            </Box>
          </Box>
        </Grid>
        <Grid item {...gridChartStyle}>
          <Box p={3} height={"100%"}>
            <Box bgcolor={"white"} p={2} borderRadius={5} height={"100%"}>
              <Typography sx={{ fontSize: 16, mb: 5 }} color="#757575">
                Ingresos VS Egresos
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: profit ?? 0,
                        label: "Ingresos",
                        color: "#26a69a",
                      },
                      {
                        id: 1,
                        value: loss ?? 0,
                        label: "Egresos",
                        color: "#e65100",
                      },
                    ],
                    arcLabel: (item) => `$ ${item.value}`,
                  },
                ]}
                height={300}
                margin={{ top: 0, bottom: 50, left: 0, right: 0 }}
                slotProps={{
                  legend: {
                    direction: "row",
                    position: { vertical: "bottom", horizontal: "middle" },
                    padding: 0,
                    itemMarkWidth: 16,
                    itemMarkHeight: 4,
                    markGap: 2,
                    itemGap: 5,
                  },
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item {...gridChartStyle}>
          <Box p={3}>
            <Box bgcolor={"white"} p={2} borderRadius={5}>
              <Typography sx={{ fontSize: 16, mb: 5 }} color="#757575">
                Desglose de egresos
              </Typography>
              <PieChart
                series={[
                  {
                    data: expenses,
                    arcLabel: (item) => `$ ${item.value}`,
                  },
                ]}
                height={300}
                margin={{ top: 0, bottom: 50, left: 0, right: 0 }}
                slotProps={{
                  legend: {
                    direction: "row",
                    position: { vertical: "bottom", horizontal: "middle" },
                    padding: 0,
                    itemMarkWidth: 16,
                    itemMarkHeight: 4,
                    markGap: 2,
                    itemGap: 5,
                  },
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item {...gridBarChartStyle}>
          <Box p={3}>
            <Box bgcolor={"white"} p={2} borderRadius={5}>
              <Typography sx={{ fontSize: 16, mb: 5 }} color="#757575">
                PositiveAndNegativeBarChart
              </Typography>
              <BarChart
                height={400}
                series={[
                  {
                    data: detail.topYdata,
                    label: "Ingresos",
                    id: "topYdata",
                    stack: "stack1",
                    color: "#26a69a",
                  },
                  {
                    data: detail.botYdata,
                    label: "Egresos",
                    id: "botYdata",
                    stack: "stack1",
                    color: "#e65100",
                  },
                ]}
                xAxis={[{ data: detail.xLabels ?? "", scaleType: "band" }]}
              >
                <ChartsReferenceLine y={0}  lineStyle={{ stroke: '#bdbdbd' }} />
              </BarChart>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
