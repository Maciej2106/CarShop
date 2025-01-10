import { useQuery } from 'react-query';
import { fetchParts } from '../api/api';
import { Part } from '../types/types';
import { ApiError } from '../types/errors';

export const useParts = (categoryName: string | null) => {
    return useQuery<Part[], ApiError>(
        ['parts', categoryName], // Klucz zapytania teraz uwzględnia categoryName
        () => fetchParts(categoryName),
        {
            enabled: categoryName !== null, // Zapytanie jest włączone tylko, gdy categoryName nie jest null
        }
    );
};