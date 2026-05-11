import React, { useState } from "react";
import {
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

function ReportsPage() {
  const [view, setView] = useState("monthly");

  // 📊 Sample Data
  const monthlySales = [5000, 7000, 6500, 9000, 12000, 15000];
  const quarterlySales = [18000, 22000, 27000, 32000];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  const categoryData = [
    { id: 0, value: 40, label: "Electronics" },
    { id: 1, value: 25, label: "Clothing" },
    { id: 2, value: 20, label: "Accessories" },
    { id: 3, value: 15, label: "Others" },
  ];

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2} mb={4}>
        <AnalyticsIcon sx={{ fontSize: 40, color: "#667eea" }} />
        <Box>
          <Typography variant="h4" gutterBottom sx={{ m: 0 }}>
            Reports & Analytics
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Monitor your sales and performance metrics
          </Typography>
        </Box>
      </Stack>

      {/* 🔹 FILTER BUTTONS */}
      <Box mb={3}>
        <Typography variant="subtitle2" gutterBottom sx={{ mb: 1.5 }}>
          Select Period:
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant={view === "monthly" ? "contained" : "outlined"}
            startIcon={<CalendarTodayIcon />}
            onClick={() => setView("monthly")}
          >
            Monthly
          </Button>

          <Button
            variant={view === "quarterly" ? "contained" : "outlined"}
            startIcon={<CalendarTodayIcon />}
            onClick={() => setView("quarterly")}
          >
            Quarterly
          </Button>
        </Stack>
      </Box>

      {/* 🔹 BAR CHART */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sales Overview
          </Typography>

          <BarChart
            series={[
              {
                data: view === "monthly" ? monthlySales : quarterlySales,
                label: "Sales",
              },
            ]}
            xAxis={[
              {
                data: view === "monthly" ? months : quarters,
                scaleType: "band",
              },
            ]}
            height={300}
          />
        </CardContent>
      </Card>

      {/* 🔹 LINE CHART (TREND) */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sales Trend
          </Typography>

          <LineChart
            series={[
              {
                data: view === "monthly" ? monthlySales : quarterlySales,
                label: "Trend",
              },
            ]}
            xAxis={[
              {
                data: view === "monthly" ? months : quarters,
                scaleType: "point",
              },
            ]}
            height={300}
          />
        </CardContent>
      </Card>

      {/* 🔹 PIE CHART */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sales by Category
          </Typography>

          <PieChart
            series={[
              {
                data: categoryData,
              },
            ]}
            width={400}
            height={250}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default ReportsPage;
