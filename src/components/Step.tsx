import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useCategories } from '../hooks/useCategories';

interface StepProps {
    categoryIdentifier: string; // Dodajemy prop categoryIdentifier
}

export const Step: React.FC<StepProps> = ({ categoryIdentifier }) => {
    const { data: categories, isLoading, error } = useCategories();

    if (isLoading) {
        return <div>Ładowanie...</div>;
    }

    if (error) {
        return <div>Błąd: {error.message}</div>;
    }

    const filteredCategories = categories?.filter(category => category.identifier === categoryIdentifier)
    if (!filteredCategories || filteredCategories.length === 0) {
        return <Typography>Brak Kategorii</Typography>;
    }


    return (
        <Box>
            <h2>Wybrana Kategoria: {categoryIdentifier}</h2> {/* Wyświetlamy identyfikator */}
            <List>
                {filteredCategories.map((category) => (
                    <ListItem key={category.identifier}>
                        <ListItemText primary={category.name} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};