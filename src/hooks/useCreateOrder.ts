import { useMutation, useQueryClient } from 'react-query';
import { createOrder } from '../api/api';

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation(createOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
        },
        onError: (error) => {
            console.error("Błąd podczas składania zamówienia:", error);
            alert("Wystąpił błąd podczas składania zamówienia.");
        }
    });
};