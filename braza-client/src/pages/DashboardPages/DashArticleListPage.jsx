import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../services/ArticleService";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

// Icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const blankForm = {
  name: "",
  title: "",
  cardTitle: "",
  cardDescription: "",
  description: "",
  types: [],
  image: "",
};

const labelize = (val) =>
  val ? `${val.charAt(0).toUpperCase()}${val.slice(1)}` : "";

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // --- State ---
  const [articlesList, setArticlesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");

  // --- API Handlers ---
  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticlesList(
        data.articles.map((article) => ({
          ...article,
          types: article.types || [],
        })),
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  // --- UI Logic Handlers ---
  const openModal = (article = null) => {
    setModal({ open: true, id: article?._id || null });
    setForm(article ? { ...blankForm, ...article } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm(blankForm);
    setErrors({});
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Article name is required.";
    if (!form.title.trim()) nextErrors.title = "Title is required.";
    if (!form.cardDescription.trim())
      nextErrors.cardDescription = "Card description is required.";
    if (!form.description.trim())
      nextErrors.description = "Description is required.";
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) return setErrors(nextErrors);

    try {
      if (modal.id) {
        await updateArticle(modal.id, form);
      } else {
        await createArticle(form);
      }
      await loadArticles();
      closeModal();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      await loadArticles();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // --- Filtering Logic ---
  const filteredArticles = useMemo(() => {
    return articlesList.filter((article) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        article.title.toLowerCase().includes(searchLower) ||
        article.cardTitle.toLowerCase().includes(searchLower) ||
        article.cardDescription.toLowerCase().includes(searchLower);

      return matchesSearch;
    });
  }, [articlesList, searchQuery]);

  // --- Table Columns ---
  const columns = [
    {
      field: "name",
      headerName: "Article Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "types",
      headerName: "Types",
      flex: 1,
      minWidth: 200,
      renderCell: ({ value }) => (
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {value &&
            value.map((type) => <Chip key={type} label={type} size="small" />)}
        </Stack>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            color="primary"
            onClick={() => openModal(params.row)}
            size="small"
            title="Edit"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row._id)}
            size="small"
            title="Delete"
          >
            <DeleteIcon fontSize="small" />
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
            <ArticleIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Animal Hub Articles
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Browse, search, and manage animal stories and article entries.
              </Typography>
            </Box>
          </Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => openModal()}
          >
            Add Article
          </Button>
        </Stack>
      </Paper>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 4, boxShadow: 1 }}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            placeholder="Search articles..."
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
          <Button
            variant="text"
            onClick={() => {
              setSearchQuery("");
            }}
          >
            Clear
          </Button>
        </Stack>
      </Paper>

      {/* DataGrid */}
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={filteredArticles}
          columns={columns}
          loading={loading}
          getRowId={(row) => row._id || row.name}
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
            {modal.id ? "Edit Article" : "Add Article"}
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Article Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                disabled={!!modal.id}
              />

              <TextField
                fullWidth
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
              />

              <TextField
                fullWidth
                label="Card Title"
                name="cardTitle"
                value={form.cardTitle}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Card Description"
                name="cardDescription"
                multiline
                rows={2}
                value={form.cardDescription}
                onChange={handleChange}
                error={!!errors.cardDescription}
                helperText={errors.cardDescription}
              />

              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={3}
                value={form.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
              />

              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={form.image}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Types (comma-separated)"
                name="types"
                value={form.types.join(", ")}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    types: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter((t) => t),
                  }))
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? "Save Changes" : "Create Article"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
