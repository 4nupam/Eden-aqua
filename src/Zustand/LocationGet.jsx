import { create } from "zustand";

const useLocationStore = create((set) => ({
  location: [],         // Stores fetched location data
  error: null,          // Holds error messages if any
  loading: false,       // Tracks loading state

  fetchLocation: async () => {
    set({ loading: true, error: null }); // Start loading

    try {
      const response = await fetch("https://edenaqua-production.up.railway.app/api/stores");

      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }

      const data = await response.json();

      set({ location: data, loading: false }); // Success
    } catch (error) {
      set({ error: error.message, loading: false }); // Error
    }
  },
}));


export default useLocationStore;