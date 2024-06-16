import { create } from "zustand";

type SearchStore = {
  isOpen: boolean; // // 검색 UI 가 열려있는지 확인.
  onOpen: () => void; // 검색 UI 오픈.
  onClose: () => void; // 검색 UI 클로즈.
  toggle: () => void; // 검색 UI 상태 토글.
};

export const useSearch = create<SearchStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}));
