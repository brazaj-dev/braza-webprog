import React, { useState, useMemo } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

// Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];
const statuses = ["active", "inactive"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  role: "editor",
  department: "",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      age: "25",
      email: "john@email.com",
      role: "admin",
      department: "Engineering",
      isActive: true,
      username: "jdoe",
      gender: "male",
      contactNumber: "09123456789",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      age: "30",
      email: "jane@email.com",
      role: "editor",
      department: "Marketing",
      isActive: true,
      username: "jsmith",
      gender: "female",
      contactNumber: "09234567890",
    },
  ]);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Logic Handlers
  const openModal = (user = null) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    setForm(blankForm);
    setErrors({});
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();

    const requiredFields = [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["email", "Email"],
      ["username", "Username"],
    ];

    requiredFields.forEach(([key, label]) => {
      if (!String(form[key]).trim()) nextErrors[key] = `${label} is required.`;
    });

    // Email validation
    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (
      !nextErrors.email &&
      users.some((u) => u.id !== modal.id && u.email === email)
    ) {
      nextErrors.email = "Email already exists.";
    }

    // Username validation - must not contain spaces
    if (form.username && form.username.includes(" ")) {
      nextErrors.username = "Username must not contain spaces.";
    }

    // Password validation - at least 8 characters
    if (form.password && form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    // Age validation - must be a number only
    if (form.age && !/^\d+$/.test(form.age)) {
      nextErrors.age = "Age must be a number only.";
    }

    // Contact number validation - must be 11 digits
    if (
      form.contactNumber &&
      !/^\d{11}$/.test(form.contactNumber.replace(/\D/g, ""))
    ) {
      nextErrors.contactNumber = "Contact number must be 11 digits.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const userData = {
      ...form,
      email: form.email.toLowerCase(),
      username: form.username.toLowerCase(),
    };

    setUsers((prev) =>
      modal.id
        ? prev.map((u) => (u.id === modal.id ? { ...u, ...userData } : u))
        : [...prev, { ...userData, id: Date.now() }],
    );
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // 🔍 Filter and Search Logic
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search filter - search in firstName, lastName, email, username
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        (user.username && user.username.toLowerCase().includes(searchLower));

      // Role filter
      const matchesRole = !filterRole || user.role === filterRole;

      // Gender filter
      const matchesGender = !filterGender || user.gender === filterGender;

      // Status filter
      const matchesStatus =
        !filterStatus ||
        (filterStatus === "active" ? user.isActive : !user.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [users, searchQuery, filterRole, filterGender, filterStatus]);

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  // Table Columns
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      minWidth: 150,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "department", headerName: "Department", width: 130 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: ({ row }) => (
        <Chip
          label={row.isActive ? "Active" : "Inactive"}
          color={row.isActive ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: ({ row }) => (
        <Stack
          direction="row"
          spacing={1}
          sx={{ height: "100%", alignItems: "center" }}
        >
          <IconButton
            color="primary"
            onClick={() => openModal(row)}
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(row.id)}
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <PeopleIcon
            sx={{ fontSize: 40, color: theme.palette.primary.main }}
          />
          <Box>
            <Typography variant="h4">Users Management</Typography>
            <Typography variant="body2" color="textSecondary">
              Manage system access and profiles
            </Typography>
          </Box>
        </Stack>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openModal()}
          size="large"
        >
          Add New User
        </Button>
      </Stack>

      {/* Stats Card */}
      <Card sx={{ mb: 3, maxWidth: 300 }}>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            Total Active Users
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {filteredUsers.filter((u) => u.isActive).length} /{" "}
            {filteredUsers.length}
          </Typography>
        </CardContent>
      </Card>

      {/* 🔍 SEARCH AND FILTER SECTION */}
      <Paper sx={{ p: 2.5, mb: 3 }}>
        <Stack spacing={2}>
          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="🔍 Search by name, email, or username..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "action.active", mr: 1 }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <Tooltip title="Clear search">
                    <IconButton size="small" onClick={() => setSearchQuery("")}>
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            size="small"
          />

          {/* Filter Dropdowns */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              select
              label="Filter by Role"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All Roles</MenuItem>
              {roles.map((r) => (
                <MenuItem key={r} value={r}>
                  {labelize(r)}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Filter by Gender"
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All Genders</MenuItem>
              {genders.map((g) => (
                <MenuItem key={g} value={g}>
                  {labelize(g)}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Filter by Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>

            {/* Clear Filters Button */}
            <Button
              variant="outlined"
              onClick={() => {
                setSearchQuery("");
                setFilterRole("");
                setFilterGender("");
                setFilterStatus("");
              }}
              size="small"
            >
              Clear All
            </Button>
          </Stack>

          {/* Results Count */}
          <Typography variant="caption" color="textSecondary">
            Showing {filteredUsers.length} of {users.length} users
          </Typography>
        </Stack>
      </Paper>

      {/* Data Table */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>

      {/* User Modal */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        maxWidth="md"
        fullScreen={isMobile}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: "bold" }}>
            {modal.id ? "✏️ Edit User" : "➕ Add New User"}
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("firstName", "First Name")} />
                <TextField {...fieldProps("lastName", "Last Name")} />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  {...fieldProps("email", "Email Address", { type: "email" })}
                />
                <TextField {...fieldProps("department", "Department")} />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  {...fieldProps("age", "Age", {
                    type: "number",
                    helperText: errors.age || "Must be a number",
                  })}
                />
                <TextField
                  {...fieldProps("gender", "Gender", { select: true })}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  {genders.map((g) => (
                    <MenuItem key={g} value={g}>
                      {labelize(g)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <TextField
                {...fieldProps("contactNumber", "Contact Number", {
                  placeholder: "09123456789",
                  helperText: errors.contactNumber || "11 digits required",
                })}
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("role", "Role", { select: true })}>
                  {roles.map((r) => (
                    <MenuItem key={r} value={r}>
                      {labelize(r)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  {...fieldProps("username", "Username", {
                    helperText: errors.username || "No spaces allowed",
                  })}
                />
              </Stack>
              <TextField
                {...fieldProps("password", "Password", {
                  type: showPassword ? "text" : "password",
                  helperText: errors.password || "Minimum 8 characters",
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                })}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={form.isActive}
                    name="isActive"
                    onChange={handleChange}
                  />
                }
                label={form.isActive ? "Account Active" : "Account Inactive"}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? "Update User" : "Save User"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
