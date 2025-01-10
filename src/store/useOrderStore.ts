import { create } from 'zustand';
import { Part, InputValues } from '../types/types';

interface OrderState {
    selectedParts: Part[];
    addPart: (part: Part) => void;
    removePart: (partId: string) => void;
    resetOrder: () => void;
    userDetails: InputValues;
    setUserDetails: (details: InputValues) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    selectedParts: [],
    addPart: (part) => set((state) => ({ selectedParts: [...state.selectedParts, part] })),
    removePart: (partId) => set((state) => ({
        selectedParts: state.selectedParts.filter((part) => part.partId !== partId)
    })),
    resetOrder: () => set({ selectedParts: [], userDetails: { firstName: '', lastName: '', email: '' } }),
    userDetails: { firstName: '', lastName: '', email: '' },
    setUserDetails: (details) => set({ userDetails: details }),
}));
