import { ApiError } from "../types/errors";
import { Category, Order, Part } from "../types/types";

const API_URL = 'http://localhost:3000';

const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        try {
            const errorData = await response.json();
            const apiError: ApiError = {
                message: errorData.message || `Błąd HTTP: ${response.status}`,
                status: response.status,
            };
            throw apiError;
        } catch {
            const apiError: ApiError = {
                message: `Błąd HTTP: ${response.status} - ${response.statusText}`,
                status: response.status,
            };
            throw apiError;
        }
    }
    return response.json();
};

const handleApiError = (error: unknown): ApiError => {
    if (error instanceof Error) {
        return { message: error.message };
    } else if (typeof error === 'string') {
        return { message: error };
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      return { message: (error as { message: string }).message };
    }
    return { message: "Wystąpił nieznany błąd." };
};


export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const response = await fetch(`${API_URL}/categories`);
        return handleResponse(response);
    } catch (error: unknown) {
        console.error("Błąd fetchCategories:", error);
        throw handleApiError(error);
    }
};

export const fetchParts = async (categoryId: string | null): Promise<Part[]> => {
    let url = `${API_URL}/parts`;
    if (categoryId) {
        url += `?category=${categoryId}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error ${response.status}: ${errorText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Błąd fetchParts:", error);
        throw error;
    }
};

export const fetchOrders = async (): Promise<Order[]> => {
    try {
        const res = await fetch(`${API_URL}/orders`);
        return handleResponse(res);
    } catch (error: unknown) {
        console.error("Błąd pobierania zamówień:", error);
        throw handleApiError(error);
    }
};

export const createOrder = async (order: Omit<Order, 'id'>): Promise<Order> => {
    try {
        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        });
        return handleResponse(res);
    } catch (error: unknown) {
        console.error("Błąd tworzenia zamówienia:", error);
        throw handleApiError(error);
    }
};

export const addCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
    try {
        const res = await fetch(`${API_URL}/categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category),
        });
        return handleResponse(res);
    } catch (error: unknown) {
        console.error("Błąd dodawania kategorii:", error);
        throw handleApiError(error);
    }
};

export const deleteCategory = async (id: string): Promise<void> => {
    try {
        const res = await fetch(`${API_URL}/categories/${id}`, {
            method: 'DELETE',
        });
        return handleResponse(res);
    } catch (error: unknown) {
        console.error("Błąd usuwania kategorii:", error);
        throw handleApiError(error);
    }
};

export const addPart = async (part: Omit<Part, 'id'>): Promise<Part> => {
    try {
        const res = await fetch(`${API_URL}/parts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(part),
        });
        return handleResponse(res);
    } catch (error: unknown) {
        console.error("Błąd dodawania części:", error);
        throw handleApiError(error);
    }
};

export const deletePart = async (id: string): Promise<void> => {
    try {
        const res = await fetch(`${API_URL}/parts/${id}`, {
            method: 'DELETE',
        });
        return handleResponse(res);
    } catch (error: unknown) {
        console.error("Błąd usuwania części:", error);
        throw handleApiError(error);
    }
};