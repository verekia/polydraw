import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { Point } from '#/lib/types'

interface Store {
  canvas: { width: number; height: number; zoomLevel: number }
  setCanvas: ({ width, height }: { width: number; height: number; zoomLevel: number }) => void
  selectedPointId?: string
  setSelectedPointId: (id?: string) => void
  points: Point[]
  setPoints: (points: Point[]) => void
  addPoint: (point: Point) => void
  removePoint: (id: string) => void
  moveDownPoint: (id: string) => void
  moveUpPoint: (id: string) => void
  clearPoints: () => void
  mode?: 'add-point'
  setMode: (mode?: 'add-point') => void
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
        points: [],
        setPoints: points => set({ points }),
        addPoint: point => set({ points: [...get().points, point] }),
        removePoint: id => set({ points: get().points.filter(p => p.id !== id) }),
        moveDownPoint: id => {
          const points = [...get().points]
          const index = points.findIndex(p => p.id === id)
          const point = points.splice(index, 1)[0]
          points.splice(index + 1, 0, point)
          set({ points })
        },
        moveUpPoint: id => {
          const points = [...get().points]
          const index = points.findIndex(p => p.id === id)
          const point = points.splice(index, 1)[0]
          points.splice(index - 1, 0, point)
          set({ points })
        },
        clearPoints: () => set({ points: [] }),
        mode: 'add-point',
        setMode: mode => set({ mode }),
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
