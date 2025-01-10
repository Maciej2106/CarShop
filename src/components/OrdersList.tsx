import { List, ListItem, ListItemText, Typography, Container, Button, Paper, Divider } from '@mui/material';
import { useOrders } from '../hooks/useOrders';
import { Link } from 'react-router-dom';

export const OrdersList = () => {
    const { data: orders, isLoading, error } = useOrders();

    if (isLoading) {
        return (
            <Container sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h6" color="text.secondary">Ładowanie zamówień...</Typography>
            </Container>
        );
    }
    if (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : typeof error === 'string'
                ? error
                : 'Nieznany błąd';
        return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="error">
          Błąd ładowania zamówień: {errorMessage}
        </Typography>
      </Container>
    );
    }

    if (!orders || orders.length === 0) {
        return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="text.secondary">
          Brak zamówień do wyświetlenia.
        </Typography>
      </Container>
    );
    }

    return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Lista Zamówień
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          {orders.map((order) => (
            <ListItem
              key={order.id || Math.random()}
              sx={{
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                py: 2,
              }}
            >
            <ListItemText
              primary={
                <Typography fontWeight="bold">
                    {`${order.firstName} ${order.lastName}`}
                </Typography>
              }
              secondary={
                <Typography color="text.secondary">
                    {`Email: ${order.email}, Wartość zamówienia: ${order.value.toFixed(2)} zł, Części: ${order.details}`}
                </Typography>
              }
            />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/creator"
          fullWidth
          sx={{ mt: 2 }}
        >
          Powrót do Kreatora
        </Button>
      </Paper>
    </Container>
  );
};