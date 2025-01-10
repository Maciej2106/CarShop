import { useQuery } from 'react-query';
import { fetchOrders } from '../api/api';
import { Order } from '../types/types';

export const useOrders = () => {
    return useQuery<Order[]>('orders', fetchOrders);
};