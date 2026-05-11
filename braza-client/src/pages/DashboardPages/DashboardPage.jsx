import React from "react";
import { useLocation } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Gauge } from "@mui/x-charts/Gauge";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PersonIcon from "@mui/icons-material/Person";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First Name", width: 150, editable: true },
  { field: "lastName", headerName: "Last Name", width: 150, editable: true },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 160,
    valueGetter: (params) =>
      params && params.row
        ? `${params.row.firstName || ""} ${params.row.lastName || ""}`
        : "",
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
];

function DashboardPage() {
  const location = useLocation();

  // 📊 Calculations
  const totalUsers = rows.length;
  const validAges = rows.filter((r) => r.age !== null);
  const avgAge =
    validAges.reduce((sum, r) => sum + r.age, 0) / validAges.length;

  const maxAge = Math.max(...validAges.map((r) => r.age));

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* 🔹 SUMMARY CARDS */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={4}>
        <Card
          sx={{
            flex: 1,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#fff", opacity: 0.8 }}
                >
                  Total Users
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  {totalUsers}
                </Typography>
              </Box>
              <GroupIcon sx={{ fontSize: 50, color: "#fff", opacity: 0.8 }} />
            </Stack>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          }}
        >
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#fff", opacity: 0.8 }}
                >
                  Average Age
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  {avgAge.toFixed(1)}
                </Typography>
              </Box>
              <AccessTimeIcon
                sx={{ fontSize: 50, color: "#fff", opacity: 0.8 }}
              />
            </Stack>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          }}
        >
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#fff", opacity: 0.8 }}
                >
                  Oldest User
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  {maxAge}
                </Typography>
              </Box>
              <TrendingUpIcon
                sx={{ fontSize: 50, color: "#fff", opacity: 0.8 }}
              />
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* 🔹 GAUGE SECTION */}
      <Stack direction="row" spacing={3} mb={4}>
        <Gauge width={120} height={120} value={avgAge} />
        <Gauge width={120} height={120} value={maxAge} valueMax={150} />
      </Stack>

      {/* 🔹 CHARTS */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={4}>
        <BarChart
          series={[{ data: validAges.map((r) => r.age), label: "User Ages" }]}
          xAxis={[
            {
              data: validAges.map((r) => r.firstName),
              scaleType: "band",
            },
          ]}
          height={300}
        />

        <PieChart
          series={[
            {
              data: [
                { id: 0, value: totalUsers, label: "Users" },
                { id: 1, value: 10, label: "Admins" },
              ],
            },
          ]}
          width={300}
          height={250}
        />
      </Stack>

      {/* 🔹 DATA TABLE */}
      <Typography variant="h5" gutterBottom>
        Users Overview
      </Typography>

      <Box sx={{ height: 400, width: "100%", mb: 4 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          checkboxSelection
        />
      </Box>

      {/* 🔹 MAP */}
      <Typography variant="h5" gutterBottom>
        Location Map
      </Typography>

      <Box sx={{ height: 400 }}>
        <MapContainer
          center={[14.604253, 120.994314]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[14.604253, 120.994314]}>
            <Popup>Manila Location</Popup>
          </Marker>
        </MapContainer>
      </Box>
    </>
  );
}

export default DashboardPage;
