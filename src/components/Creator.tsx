import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

export const Creator = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/categories');
    }
    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundImage: 'url(/path/to/background-image.jpg)', //Ścieżka do tła
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                textAlign: 'center',
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h2" fontWeight="bold" gutterBottom>
                    Konfigurator Samochodu
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Rozpocznij swoją przygodę z konfiguracją wymarzonego samochodu.
                    Dopasuj części, sprawdź opcje i stwórz pojazd idealny dla siebie!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleClick}
                    sx={{
                        marginTop: 3,
                        paddingX: 4,
                        paddingY: 2,
                        fontSize: '1.2rem',
                        textTransform: 'uppercase',
                        boxShadow: 2,
                        ':hover': {
                            boxShadow: 4,
                            backgroundColor: 'primary.dark',
                        },
                    }}
                >
                    Start
                </Button>
            </Box>
            <Outlet />
        </Container>
    );
};