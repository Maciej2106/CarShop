import { Link, useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Button, Checkbox, Container, Paper, Divider } from '@mui/material';
import { useParts } from '../hooks/useParts';
import { useCategories } from '../hooks/useCategories';
import { useOrderStore } from '../store/useOrderStore';
import { Part } from '../types/types';
import { ArrowBack, ShoppingCart } from '@mui/icons-material';

export const CategoryParts = () => {
    const { categoryName } = useParams();
    const { data: categories } = useCategories();
    const navigate = useNavigate();
    const { addPart, removePart, selectedParts } = useOrderStore();

    const category = categories?.find(cat => cat.identifier === categoryName);
    const categoryId = category?.id || null;
    const { data: parts, isLoading, error } = useParts(categoryId);

    const isPartSelected = (partId: string) => selectedParts.some(part => part.partId === partId);

    const handleTogglePart = (part: Part) => {
        if (isPartSelected(part.partId)) {
            removePart(part.partId);
        } else {
            addPart(part);
        }
    };

    const totalPrice = selectedParts.reduce((sum, part) => sum + part.price, 0);

    const handleNext = () => {
        if (selectedParts.length === 0) {
            alert('Proszę wybrać co najmniej jedną część.');
        } else {
            navigate('/order-summary');
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography>Ładowanie danych...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error" variant="h6">
          Błąd ładowania danych: {error.message}
        </Typography>
      </Box>
    );
    }

    if (!parts || parts.length === 0) {
        return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="textSecondary">
          Brak części dla kategorii: {categoryName}
        </Typography>
      </Box>
    );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Części dla kategorii: {category?.name || categoryName}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          {parts.map((part) => (
            <ListItem
              key={part.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1,
                p: 1,
                borderRadius: 2,
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={isPartSelected(part.partId)}
                  onChange={() => handleTogglePart(part)}
                  color="primary"
                />
                <ListItemText
                  primary={part.name}
                  secondary={`Cena: ${part.price.toFixed(2)} zł`}
                />
              </Box>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" align="center" gutterBottom>
          Łączna cena: {totalPrice.toFixed(2)} zł
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            component={Link}
            to="/categories"
          >
            Powrót do kategorii
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCart />}
            onClick={handleNext}
          >
            Dalej
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
