import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconAnchor: [12, 41],
});

const stats = [
  { value: "9", label: "Total Users" },
  { value: "47.8", label: "Average Age" },
  { value: "50", label: "Performance" },
  { value: "60", label: "Efficiency" },
];

const quarterlySales = [35, 48, 29, 53];
const quarterLabels = ["Q1", "Q2", "Q3", "Q4"];
const distributionData = [
  { id: 0, value: 42, label: "Series A" },
  { id: 1, value: 33, label: "Series B" },
  { id: 2, value: 25, label: "Series C" },
];

function DashboardPage() {
  const userType = localStorage.getItem("type") || "viewer";

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 4 },
        maxWidth: 1440,
        mx: "auto",
        minHeight: "calc(100vh - 90px)",
      }}
    >
      <Stack spacing={3}>
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            background: "linear-gradient(90deg, #0f172a 0%, #2563eb 100%)",
            color: "#fff",
            boxShadow: "0 20px 60px rgba(15,23,42,0.16)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={2}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{ letterSpacing: 2, color: "rgba(255,255,255,0.75)" }}
              >
                Dashboard Overview
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mt: 1 }}>
                Animal Hub Summary
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 1, maxWidth: 520, color: "rgba(255,255,255,0.88)" }}
              >
                Monitor animal activity, user metrics, and location data from
                one clean overview page.
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/dashboard/reports"
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#0f172a",
                textTransform: "none",
                px: 4,
                py: 1.5,
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#f8fafc",
                },
              }}
            >
              View Reports
            </Button>
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          {stats.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.label}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  minHeight: 140,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase", letterSpacing: 1.2 }}
                >
                  {item.label}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mt: 2 }}>
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, minHeight: 420 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Quarterly Sales
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Sales performance
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      bgcolor: "#0ea5e9",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Series 1
                  </Typography>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      bgcolor: "#14b8a6",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Series 2
                  </Typography>
                </Stack>
              </Stack>
              <BarChart
                series={[
                  {
                    label: "Sales",
                    data: quarterlySales,
                    color: "#0ea5e9",
                  },
                ]}
                xAxis={[
                  {
                    data: quarterLabels,
                    scaleType: "band",
                  },
                ]}
                height={320}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, minHeight: 420 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ textTransform: "uppercase", letterSpacing: 1.2 }}
              >
                Distribution
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Category share
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <PieChart
                  series={[{ data: distributionData }]}
                  width={360}
                  height={320}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Live Map
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                National University Manila
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Pinned on the map
            </Typography>
          </Stack>
          <Box sx={{ height: 420, borderRadius: 3, overflow: "hidden" }}>
            <MapContainer
              center={[14.604293, 120.994273]}
              zoom={16}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[14.604293, 120.994273]} icon={defaultIcon}>
                <Popup>National University Manila</Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}

export default DashboardPage;
