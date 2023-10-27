import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Store {
  canvas: { width: number; height: number; zoomLevel: number }
  setCanvas: ({ width, height }: { width: number; height: number; zoomLevel: number }) => void
  selectedPointId?: string
  setSelectedPointId: (id?: string) => void
}

export const useStore = create<Store>()(
  devtools(
    persist(
      (set, get) => ({
        canvas: { width: 500, height: 300, zoomLevel: 1 },
        setCanvas: ({
          width,
          height,
          zoomLevel,
        }: {
          width: number
          height: number
          zoomLevel: number
        }) => set({ canvas: { width, height, zoomLevel } }),
        selectedPointId: undefined,
        setSelectedPointId: (id?: string) => set({ selectedPointId: id }),
      }),
      {
        name: 'polydraw',
        partialize: state =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => ['_doesnt-exist'].includes(key)),
          ),
      },
    ),
  ),
)
