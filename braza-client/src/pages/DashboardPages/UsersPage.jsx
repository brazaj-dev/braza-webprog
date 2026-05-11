import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Stack,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleIcon from "@mui/icons-material/People";

const initialUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 25,
    email: "john.doe@email.com",
    department: "Engineering",
    status: "Active",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    age: 30,
    email: "jane.smith@email.com",
    department: "Marketing",
    status: "Active",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    age: 28,
    email: "mike.j@email.com",
    department: "Sales",
    status: "Inactive",
  },
];

function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [form, setForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    department: "",
    status: "Active",
  });

  // 🔹 Open Add Modal
  const handleAdd = () => {
    setEditUser(null);
    setForm({
      id: "",
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      department: "",
      status: "Active",
    });
    setOpen(true);
  };

  // 🔹 Open Edit Modal
  const handleEdit = (user) => {
    setEditUser(user);
    setForm(user);
    setOpen(true);
  };

  // 🔹 Delete User
  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  // 🔹 Save User (Add or Edit)
  const handleSave = () => {
    if (editUser) {
      // Update
      setUsers(users.map((u) => (u.id === form.id ? form : u)));
    } else {
      // Add
      setUsers([...users, { ...form, id: Date.now() }]);
    }
    setOpen(false);
  };

  // 🔹 Columns
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "age", headerName: "Age", width: 80 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "department", headerName: "Department", width: 140 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Active" ? "success" : "default"}
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            startIcon={<EditIcon />}
            sx={{ fontSize: "0.75rem" }}
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            sx={{ fontSize: "0.75rem" }}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <PeopleIcon sx={{ fontSize: 40, color: "#667eea" }} />
        <Box>
          <Typography variant="h4" sx={{ m: 0 }}>
            Users Management
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Manage and view all users in the system
          </Typography>
        </Box>
      </Stack>

      {/* 🔹 ADD BUTTON */}
      <Box mb={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          size="large"
        >
          Add New User
        </Button>
      </Box>

      {/* 🔹 USERS COUNT CARD */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="body2" color="textSecondary">
                Total Users
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                {users.length}
              </Typography>
            </Box>
            <PeopleIcon sx={{ fontSize: 40, color: "#667eea", opacity: 0.3 }} />
          </Stack>
        </CardContent>
      </Card>

      {/* 🔹 TABLE */}
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>

      {/* 🔹 MODAL FORM */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {editUser ? "✏️ Edit User" : "➕ Add New User"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              fullWidth
              label="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Age"
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Department"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Status"
              select
              SelectProps={{ native: true }}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              variant="outlined"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editUser ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UsersPage;
