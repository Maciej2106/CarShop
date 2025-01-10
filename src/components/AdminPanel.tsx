import { useState } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAddCategory } from '../hooks/useAddCategory';
import { useDeleteCategory } from '../hooks/useDeleteCategory';
import { useAddPart } from '../hooks/useAddPart';
import { useParts } from '../hooks/useParts';
import { useCategories } from '../hooks/useCategories';
import { useDeletePart } from '../hooks/useDeletePart';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Delete } from '@mui/icons-material';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const { mutate: addCategoryMutation, isLoading: isAddingCategory } = useAddCategory();
  const { mutate: deleteCategoryMutation, isLoading: isDeletingCategory } = useDeleteCategory();
  const { data: parts, isLoading: partsLoading, error: partsError } = useParts('');
  const { mutate: addPartMutation, isLoading: isAddingPart } = useAddPart();
  const { mutate: deletePartMutation, isLoading: isDeletingPart } = useDeletePart();

  const [newCategory, setNewCategory] = useState({ name: '', identifier: '', position: 0 });
  const [newPart, setNewPart] = useState({ name: '', price: 0, partId: '', category: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: 'category' | 'part' } | null>(null);

  const handleAddCategory = () => {
    addCategoryMutation(newCategory);
    setNewCategory({ name: '', identifier: '', position: 0 });
  };

  const handleAddPart = () => {
    addPartMutation(newPart);
    setNewPart({ name: '', price: 0, partId: '', category: '' });
  };

  const handleDelete = (id: string, type: 'category' | 'part') => {
    setItemToDelete({ id, type });
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      if (itemToDelete.type === 'category') {
        deleteCategoryMutation(itemToDelete.id);
      } else {
        deletePartMutation(itemToDelete.id);
      }
    }
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  if (categoriesLoading || partsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (categoriesLoading || partsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (categoriesError || partsError) {
    return (
      <Alert severity="error">
        {categoriesError?.message || partsError?.message || 'Wystąpił błąd podczas ładowania danych.'}
      </Alert>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleGoBack}
        >
          Powrót na stronę główną
        </Button>
        <Typography variant="h4" align="center" sx={{ flex: 1 }}>
          Panel Administracyjny
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Add Category and Part Section */}
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5">Dodaj kategorię</Typography>
              <TextField
                label="Nazwa"
                fullWidth
                margin="normal"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
              <TextField
                label="Identyfikator"
                fullWidth
                margin="normal"
                value={newCategory.identifier}
                onChange={(e) => setNewCategory({ ...newCategory, identifier: e.target.value })}
              />
              <TextField
                label="Pozycja"
                fullWidth
                type="number"
                margin="normal"
                value={newCategory.position}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, position: parseInt(e.target.value) || 0 })
                }
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleAddCategory}
                disabled={isAddingCategory}
              >
                {isAddingCategory ? <CircularProgress size={24} /> : 'Dodaj kategorię'}
              </Button>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h5">Dodaj część</Typography>
              <TextField
                label="Nazwa"
                fullWidth
                margin="normal"
                value={newPart.name}
                onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
              />
              <TextField
                label="Cena"
                fullWidth
                type="number"
                margin="normal"
                value={newPart.price}
                onChange={(e) => setNewPart({ ...newPart, price: parseInt(e.target.value) || 0 })}
              />
              <TextField
                label="Identyfikator Części"
                fullWidth
                margin="normal"
                value={newPart.partId}
                onChange={(e) => setNewPart({ ...newPart, partId: e.target.value })}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="category-select-label">Kategoria</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={newPart.category}
                  label="Kategoria"
                  onChange={(e) => setNewPart({ ...newPart, category: e.target.value })}
                >
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                fullWidth
                onClick={handleAddPart}
                disabled={isAddingPart}
              >
                {isAddingPart ? <CircularProgress size={24} /> : 'Dodaj część'}
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Lists Section */}
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5">Lista Kategorii</Typography>
              <List>
                {categories?.map((category) => (
                  <ListItem
                    key={category.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(category.id, 'category')}
                        disabled={isDeletingCategory}
                      >
                        {isDeletingCategory ? <CircularProgress size={20} /> : <DeleteIcon />}
                      </IconButton>
                    }
                  >
                    <ListItemText primary={category.name} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h5">Lista Części</Typography>
              <List>
                {parts?.map((part) => (
                  <ListItem
                    key={part.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(part.id.toString(), 'part')}
                        disabled={isDeletingPart}
                      >
                        {isDeletingPart ? <CircularProgress size={20} /> : <Delete />}
                      </IconButton>
                    }
                  >
                    <ListItemText primary={part.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Paper>

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Czy na pewno chcesz usunąć?</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Anuluj</Button>
            <Button onClick={confirmDelete} autoFocus disabled={isDeletingCategory || isDeletingPart}>
              {isDeletingCategory || isDeletingPart ? <CircularProgress size={24} /> : 'Potwierdź'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};
