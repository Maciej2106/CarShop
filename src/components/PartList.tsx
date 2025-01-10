import React from 'react';
import { useParts } from '../hooks/useParts';
import { Typography, List, ListItem, ListItemText, CircularProgress, Container, Alert } from '@mui/material';
import { Part } from '../types/types';
import { useSearchParams } from 'react-router-dom';

interface PartListProps {
    categoryName: string;
    onPartClick?: (part: Part) => void;
}

export const PartList: React.FC<PartListProps> = ({ categoryName, onPartClick }) => {
    const { data: parts, isLoading, error } = useParts(categoryName);
    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get('category');

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
                <Alert severity="error">Wystąpił błąd podczas ładowania części.</Alert>
            </Container>
        );
    }

    if (!parts || parts.length === 0) {
        return (
            <Container>
                <Typography>Brak dostępnych części w tej kategorii: {categoryName}</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" gutterBottom>Dostępne części dla kategorii: {categoryFromUrl}</Typography> {/* Wyświetlamy kategorię z URL */}
            <List>
                {parts.map((part) => (
                    <ListItem component='button' key={part.id} onClick={() => onPartClick?.(part)}>
                        <ListItemText primary={part.name} secondary={`Cena: ${part.price} zł`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};