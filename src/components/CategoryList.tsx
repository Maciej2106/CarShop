import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemText, Typography, Container, CircularProgress, Button, Paper, Box, Divider } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const CategoryList = () => {
    const [categories, setCategories] = useState<{ id: number; identifier: string; name: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/categories');
                if (!response.ok) {
                    throw new Error('Błąd podczas pobierania danych');
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (isLoading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography color="error">Błąd ładowania kategorii: {error.message}</Typography>
            </Container>
        );
    }

    if (!categories || categories.length === 0) {
        return (
            <Container>
                <Typography>Brak dostępnych kategorii.</Typography>
            </Container>
        );
    }

    return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Kategorie
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
          Wybierz kategorię, aby zobaczyć dostępne części w tej kategorii.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          {categories.map((category) => (
            <ListItem key={category.id} disablePadding>
              <ListItemButton
                component={Link}
                to={`/categories/${category.identifier}`}
                sx={{
                  borderRadius: 2,
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                }}
              >
                <ListItemText primary={category.name} />
                <ArrowForwardIosIcon fontSize="small" />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" component={Link} to={'/creator'}>
            Cofnij
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={'/admin'}
          >
            Panel Administracyjny
          </Button>
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Wybierz Panel Administracyjny, aby dodać lub usunąć kategorie oraz część !
        </Typography>
      </Paper>
    </Container>
  );
};

  

