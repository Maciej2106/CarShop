export interface Part {
    id: number;
    name: string;
    price: number;
    quantity?: number;
    partId: string;
    category: string;
}

export interface Category {
    id: string;
    name: string;
    identifier: string;
    position: number;
}
export interface Order {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    value: number;
    details: string;
    items: OrderItem[];
    total: number;
}
export interface InputValues {
    firstName: string;
    lastName: string;
    email: string;
}
export interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
    name?: string;
};