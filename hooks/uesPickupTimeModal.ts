import { create } from 'zustand';

interface LocationModelStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const usePickupTimeModal = create<LocationModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
})) 

export default usePickupTimeModal;