import { useMutation, useQueryClient, UseMutationResult } from 'react-query';
import { addPart } from '../api/api';
import { Part } from '../types/types';

export const useAddPart = (): UseMutationResult<Part, unknown, Omit<Part, 'id'>, unknown> => {
    const queryClient = useQueryClient();
    return useMutation(addPart, {
        onSuccess: () => {
            queryClient.invalidateQueries('parts');
        },
        onError: (error) => {
            console.error("Błąd podczas dodawania części:", error);
            alert("Wystąpił błąd podczas dodawania części.");
        }
    });
};



