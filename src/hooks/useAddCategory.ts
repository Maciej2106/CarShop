import { useMutation, useQueryClient, UseMutationResult } from 'react-query';
import { addCategory } from '../api/api';
import { Category } from '../types/types';

export const useAddCategory = (): UseMutationResult<Category, unknown, Omit<Category, 'id'>, unknown> => {
    const queryClient = useQueryClient();
    return useMutation(addCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
        },
        onError: (error) => {
            console.error("Błąd podczas dodawania kategorii:", error);
            alert("Wystąpił błąd podczas dodawania kategorii.");
        }
    });
};