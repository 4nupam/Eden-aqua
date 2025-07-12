import { create } from "zustand";

const getUser = create((set) => ({
  user: {},
  error: null,
  loading: false,
  setUser: (data) => {
    set({ loading: true, error: null });

    set({ user: data, loading: false });
  },
}));

export default getUser;
