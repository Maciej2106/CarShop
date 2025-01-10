import { useMutation, useQueryClient, UseMutationResult } from 'react-query';
import { deletePart } from '../api/api';

export const useDeletePart = (): UseMutationResult<void, unknown, string, unknown> => {
    const queryClient = useQueryClient();
    return useMutation(deletePart, {
        onSuccess: () => {
            queryClient.invalidateQueries(['parts']);
        },
        onError: (error: unknown) => {
            console.error("Błąd podczas usuwania części:", error);
            alert("Wystąpił błąd podczas usuwania części.");
        }
    });
};