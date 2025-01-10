import { useMutation, useQueryClient, UseMutationResult } from 'react-query';
import { deleteCategory } from '../api/api';

export const useDeleteCategory = (): UseMutationResult<void, unknown, string, unknown> => {
    const queryClient = useQueryClient();
    return useMutation(deleteCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
        },
        onError: (error) => {
            console.error("Błąd podczas usuwania kategorii:", error);
            alert("Wystąpił błąd podczas usuwania kategorii.");
        }
    });
};