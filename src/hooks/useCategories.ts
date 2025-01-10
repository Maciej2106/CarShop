import { useState, useEffect } from 'react';
import { Category } from '../types/types';

const API_URL = 'http://localhost:3000'; 

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]); // Zmiana typu na Category[] i inicjalizacja pustą tablicą
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/categories`);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
                }
                const data: Category[] = await response.json();
                setCategories(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error("Wystąpił nieznany błąd."));
                }
                console.error("Błąd fetchCategories:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { data: categories, isLoading, error };
};
