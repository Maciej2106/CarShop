import { Box, Typography, List, ListItem, ListItemText, Button, Container, Paper, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useOrderStore } from '../store/useOrderStore';
import { ShoppingCartCheckout, Cancel }  from '@mui/icons-material';

 export const OrderSummary = () => {
    const { selectedParts, resetOrder } = useOrderStore();
    const navigate = useNavigate();

    const totalPrice = selectedParts.reduce((sum, part) => sum + part.price, 0);

    const handlePlaceOrder = () => {
        navigate('/order-form');
    };

    const handleResetOrder = () => {
        resetOrder();
        navigate('/categories');
    };

    return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Podsumowanie zamówienia
        </Typography>
        <Divider sx={{ my: 2 }} />
        {selectedParts.length > 0 ? (
          <Box>
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
                  <ListItemText
                    primary={part.name}
                    secondary={`Cena: ${part.price.toFixed(2)} zł`}
                  />
                </ListItem>
              ))}
              <ListItem sx={{ py: 2 }}>
                <Typography variant="h6" color="primary">
                  Łączna cena: {totalPrice.toFixed(2)} zł
                </Typography>
              </ListItem>
            </List>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartCheckout />}
                onClick={handlePlaceOrder}
              >
                Przejdź do danych zamówienia
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Cancel />}
                onClick={handleResetOrder}
              >
                Anuluj zamówienie
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Brak wybranych części.
            </Typography>
            <Typography variant="body1">
              Przejdź do kategorii, aby dodać części do zamówienia.
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              to="/categories"
              sx={{ mt: 2 }}
            >
              Powrót do kategorii
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};