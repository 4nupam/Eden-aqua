// src/Zustand/ProductStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProductStore = create(
  persist(
    (set) => ({
      products: [],

      setProducts: (newProducts) => set({ products: newProducts }),

     addProduct: (product) =>
  set((state) => {
    const exists = state.products.some((p) => p.id === product.id);
    if (exists) return state;
    return {
      products: [...state.products, product],
    };
  }),


      updateProductQuantity: (id, quantity) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, quantity: quantity < 1 ? 1 : quantity } : p
          ),
        })),

     removeProduct: (id) =>
  set((state) => ({
    products: state.products.filter((p) => p.id !== id),
  })),

clearCart: () => set({ products: [] }),
    }),
    {
      name: 'cart-storage', // key in localStorage
    }
  )
);

export default useProductStore;
