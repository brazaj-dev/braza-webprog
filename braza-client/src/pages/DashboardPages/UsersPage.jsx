import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { fetchUsers, createUser, updateUser } from "../../services/UserService";
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
import AccountCircle from "@mui/icons-material/AccountCircle";

const roles = ["admin", "viewer"];
const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  role: "viewer",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (val) => {
  if (!val) return "";
  if (val === "viewer") return "Editor";
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
    if (!token) {
      navigate("/auth/signin");
      return;
    }
    if (type !== "admin") {
      navigate("/dashboard");
    }
  }, [navigate]);

  // --- State ---
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // --- API Handlers ---
  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      setUsers(
        data.users.map((user) => ({
          ...user,
          role: user.type,
        })),
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Determine if the currently-open modal is editing an existing admin
  const originalUser = users.find((u) => (u._id || u.id) === modal.id) || null;
  const isOriginalAdmin = !!originalUser && originalUser.type === "admin";

  // --- UI Logic Handlers ---
  const openModal = (user = null) => {
    setModal({ open: true, id: user?._id || user?.id || null });
    setForm(
      user
        ? {
            ...blankForm,
            ...user,
            role: user.type ?? user.role,
            password: "",
          }
        : { ...blankForm },
    );
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
    if (!form.firstName.trim())
      nextErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "Invalid email.";
    if (form.username.includes(" ")) nextErrors.username = "No spaces allowed.";
    if (!modal.id && form.password.length < 8)
      nextErrors.password = "Min 8 characters.";
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) return setErrors(nextErrors);

    try {
      // Build payload and prevent accidentally changing an existing admin to Editor
      const payload = {
        ...form,
        type: form.role,
      };

      if (modal.id && isOriginalAdmin && form.role === "editor") {
        // Preserve admin role if the original user is an admin — disallow demotion to editor
        payload.type = "admin";
        console.warn(
          "Attempted to set an admin to editor; preserving admin role.",
        );
      }
      delete payload.role;

      if (modal.id) {
        if (!payload.password) delete payload.password;
        await updateUser(modal.id, payload);
      } else {
        await createUser(payload);
      }
      await loadUsers();
      closeModal();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await updateUser(id, { isActive: !currentStatus });
      await loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // --- Filtering Logic ---
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchLower) ||
        u.email.toLowerCase().includes(searchLower) ||
        u.username?.toLowerCase().includes(searchLower);

      const matchesRole = !filterRole || u.role === filterRole;
      const matchesGender = !filterGender || u.gender === filterGender;
      const matchesStatus =
        !filterStatus || (filterStatus === "active" ? u.isActive : !u.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [users, searchQuery, filterRole, filterGender, filterStatus]);

  // --- Table Columns ---
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      valueGetter: (params, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: ({ value }) => <Chip label={labelize(value)} size="small" />,
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Switch
            size="small"
            checked={params.row.isActive}
            onChange={() =>
              handleToggleActive(
                params.row._id || params.row.id,
                params.row.isActive,
              )
            }
          />
          <Typography variant="caption">
            {params.row.isActive ? "Active" : "Inactive"}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            color="primary"
            onClick={() => openModal(params.row)}
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1200,
        mx: "auto",
        minHeight: "calc(100vh - 90px)",
      }}
    >
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: 4,
          boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Animal Hub Users
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage the people and accounts behind the animal hub.
              </Typography>
            </Box>
          </Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => openModal()}
          >
            Add User
          </Button>
        </Stack>
      </Paper>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 4, boxShadow: 1 }}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <IconButton onClick={() => setSearchQuery("")}>
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              select
              label="Role"
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
              label="Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
            <Button
              variant="text"
              onClick={() => {
                setFilterRole("");
                setFilterStatus("");
                setSearchQuery("");
              }}
            >
              Clear
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* DataGrid */}
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          loading={loading}
          getRowId={(row) => row._id || row.id}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
        />
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
        fullScreen={isMobile}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle fontWeight="bold">
            {modal.id ? "Edit User" : "Add User"}
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Stack>

              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                />
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={form.gender}
                    label="Gender"
                    onChange={handleChange}
                  >
                    {genders.map((g) => (
                      <MenuItem key={g} value={g}>
                        {labelize(g)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                multiline
                rows={2}
              />

              <Stack direction="row" spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={form.role}
                    label="Role"
                    onChange={handleChange}
                  >
                    {roles
                      .filter((r) => !(isOriginalAdmin && r === "editor"))
                      .map((r) => (
                        <MenuItem key={r} value={r}>
                          {labelize(r)}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </Stack>

              <TextField
                fullWidth
                label={
                  modal.id
                    ? "New Password (Leave blank to keep current)"
                    : "Password"
                }
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={form.isActive}
                    name="isActive"
                    onChange={handleChange}
                  />
                }
                label="Account Active"
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? "Save Changes" : "Create User"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
