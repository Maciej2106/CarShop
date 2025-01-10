import { useOrderStore } from '../store/useOrderStore';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, List, ListItem, ListItemText, Alert, Box, Paper, Divider } from '@mui/material';
import { useCreateOrder } from '../hooks/useCreateOrder';
import { useState } from 'react';
import { CheckCircleOutline, ArrowBack } from '@mui/icons-material';

export const OrderForm = () => {
    const { selectedParts, userDetails, setUserDetails, resetOrder } = useOrderStore();
    const { mutate: saveOrder, isLoading } = useCreateOrder();
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);

    const totalPrice = selectedParts.reduce((sum, part) => sum + part.price, 0);
    const partsListString = selectedParts.map(part => part.name).join(', ');

    const handleSubmit = async () => {
        // Walidacja pól formularza
        if (!userDetails.firstName.trim() || !userDetails.lastName.trim()) {
            setError('Proszę wprowadzić imię i nazwisko.');
            return;
        }
        try {
            const orderItems = selectedParts.map(part => ({
                productId: Number(part.partId),
                quantity: 1,
                ...part
            }));
            await saveOrder({ items: orderItems, total: totalPrice, details: partsListString, value: totalPrice, ...userDetails }, {
                onSuccess: () => {
                    resetOrder();
                    navigate('/orders');
                }
            });
        } catch (error) {
            console.error('Błąd tworzenia zamówienia:', error);
            alert('Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserDetails({ ...userDetails, [name]: value });
        if (error) setError(null); // Usuwanie błędu po edycji
    };

    return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Podsumowanie zamówienia
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          {selectedParts.map((part) => (
            <ListItem
              key={part.partId}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                py: 1,
                px: 2,
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              }}
            >
              <ListItemText primary={`${part.name}`} secondary={`Cena: ${part.price.toFixed(2)} zł`} />
            </ListItem>
          ))}
          <ListItem>
            <Typography variant="h6" color="primary">
              Łączna cena: {totalPrice.toFixed(2)} zł
            </Typography>
          </ListItem>
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Dane osobowe
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          label="Imię"
          fullWidth
          margin="normal"
          name="firstName"
          value={userDetails.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Nazwisko"
          fullWidth
          margin="normal"
          name="lastName"
          value={userDetails.lastName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
        />
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CheckCircleOutline />}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Wysyłanie...' : 'Zatwierdź zamówienie'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ArrowBack />}
            component={Link}
            to="/order-summary"
          >
            Cofnij
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};