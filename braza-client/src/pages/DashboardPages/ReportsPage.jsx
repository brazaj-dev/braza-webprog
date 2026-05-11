import React, { useState, useRef } from "react";
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
import { Gauge } from "@mui/x-charts/Gauge";
import { DataGrid } from "@mui/x-data-grid";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

// --- Configuration for DataGrid ---
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150, editable: true },
  { field: "lastName", headerName: "Last name", width: 150, editable: true },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function ReportsPage() {
  const [view, setView] = useState("monthly");
  const printRef = useRef(null);

  // 📊 Sample Data
  const monthlySales = [18, 24, 20, 27, 30, 35];
  const quarterlySales = [62, 75, 88, 95];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  const categoryData = [
    { id: 0, value: 40, label: "Electronics" },
    { id: 1, value: 25, label: "Clothing" },
    { id: 2, value: 20, label: "Accessories" },
    { id: 3, value: 15, label: "Others" },
  ];

  // 🖨️ Printing Logic
  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=1280,height=900");
    if (!printWindow) return;

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]'),
    )
      .map((node) => node.outerHTML)
      .join("");

    const exportedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Analytics Report</title>
          ${headMarkup}
          <style>
            body { background: #fff; padding: 20px; font-family: sans-serif; }
            .print-header { border-bottom: 1px solid #ddd; margin-bottom: 20px; padding-bottom: 10px; }
            @page { size: A4; margin: 15mm; }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>Analytics Report Summary</h1>
            <p>Exported on: ${exportedAt} | View: ${view.toUpperCase()}</p>
          </div>
          ${printContent.outerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500); // Small timeout to ensure styles render
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* 🔹 HEADER SECTION */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        mb={4}
        spacing={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <AnalyticsIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Box>
            <Typography variant="h4">Reports & Analytics</Typography>
            <Typography variant="body2" color="textSecondary">
              Monitor your performance metrics and data exports.
            </Typography>
          </Box>
        </Stack>

        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          onClick={handlePrint}
        >
          Export PDF
        </Button>
      </Stack>

      {/* 🔹 FILTER BUTTONS */}
      <Box mb={3}>
        <Typography variant="subtitle2" gutterBottom>
          Select Timeframe:
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

      {/* 🔹 PRINTABLE AREA */}
      <Stack ref={printRef} spacing={4}>
        {/* Summary Section for PDF */}
        <Card
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#fff" }}
            >
              📊 Report Summary
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3} mt={2}>
              <Box>
                <Typography variant="body2" opacity={0.8}>
                  Total Sales
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {view === "monthly"
                    ? monthlySales.reduce((a, b) => a + b, 0)
                    : quarterlySales.reduce((a, b) => a + b, 0)}{" "}
                  Units
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" opacity={0.8}>
                  Average {view === "monthly" ? "Monthly" : "Quarterly"}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {Math.round(
                    view === "monthly"
                      ? monthlySales.reduce((a, b) => a + b, 0) /
                          monthlySales.length
                      : quarterlySales.reduce((a, b) => a + b, 0) /
                          quarterlySales.length,
                  )}{" "}
                  Units
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" opacity={0.8}>
                  Peak Period
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {Math.max(
                    ...(view === "monthly" ? monthlySales : quarterlySales),
                  )}{" "}
                  Units
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sales Overview
            </Typography>
            <BarChart
              series={[
                {
                  data: view === "monthly" ? monthlySales : quarterlySales,
                  label: "Units Sold",
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

        <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
          <Card sx={{ flex: 1 }}>
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
                height={250}
              />
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Category Share
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <PieChart
                  series={[{ data: categoryData }]}
                  width={350}
                  height={200}
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 0.5 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center">
                Target Progress
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 200,
                }}
              >
                <Gauge width={150} height={150} value={78} valueMax={100} />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        <Card>
          <CardContent sx={{ height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Detailed Records
            </Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default ReportsPage;
