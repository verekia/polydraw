import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { Point, PointId, Polygon, PolygonGroup, PolygonGroupId, PolygonId } from '#/lib/types'

interface Store {
  canvas: { width: number; height: number; zoomLevel: number }
  setCanvas: ({ width, height }: { width: number; height: number; zoomLevel: number }) => void
  selectedPointId?: PointId
  setSelectedPointId: (id?: PointId) => void
  points: Point[]
  setPoints: (points: Point[]) => void
  addPoint: (point: Point) => void
  removePoint: (id: PointId) => void
  moveDownPoint: (id: PointId) => void
  moveUpPoint: (id: PointId) => void
  clearPoints: () => void
  polygonGroups: PolygonGroup[]
  setPolygonGroups: (polygonGroups: PolygonGroup[]) => void
  addPolygonGroup: (polygonGroup: PolygonGroup) => void
  removePolygonGroup: (id: PolygonGroupId) => void
  moveDownPolygonGroup: (id: PolygonGroupId) => void
  moveUpPolygonGroup: (id: PolygonGroupId) => void
  clearPolygonGroups: () => void
  polygons: Polygon[]
  setPolygons: (polygons: Polygon[]) => void
  addPolygon: (polygon: Polygon) => void
  removePolygon: (id: PolygonId) => void
  moveDownPolygon: (id: PolygonId) => void
  moveUpPolygon: (id: PolygonId) => void
  clearPolygons: () => void
  selectedPolygonId?: PolygonId
  setSelectedPolygonId: (id?: PolygonId) => void
  selectedPolygonGroupId?: PolygonGroupId
  setSelectedPolygonGroupId: (id?: PolygonGroupId) => void
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
        setSelectedPointId: (id?: PointId) => set({ selectedPointId: id }),
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
        polygonGroups: [],
        setPolygonGroups: polygonGroups => set({ polygonGroups }),
        addPolygonGroup: polygonGroup =>
          set({ polygonGroups: [...get().polygonGroups, polygonGroup] }),
        removePolygonGroup: id =>
          set({ polygonGroups: get().polygonGroups.filter(p => p.id !== id) }),
        moveDownPolygonGroup: id => {
          const polygonGroups = [...get().polygonGroups]
          const index = polygonGroups.findIndex(p => p.id === id)
          const polygonGroup = polygonGroups.splice(index, 1)[0]
          polygonGroups.splice(index + 1, 0, polygonGroup)
          set({ polygonGroups })
        },
        moveUpPolygonGroup: id => {
          const polygonGroups = [...get().polygonGroups]
          const index = polygonGroups.findIndex(p => p.id === id)
          const polygonGroup = polygonGroups.splice(index, 1)[0]
          polygonGroups.splice(index - 1, 0, polygonGroup)
          set({ polygonGroups })
        },
        clearPolygonGroups: () => set({ polygonGroups: [] }),
        polygons: [],
        setPolygons: polygons => set({ polygons }),
        addPolygon: polygon => set({ polygons: [...get().polygons, polygon] }),
        removePolygon: id => set({ polygons: get().polygons.filter(p => p.id !== id) }),
        moveDownPolygon: id => {
          const polygons = [...get().polygons]
          const index = polygons.findIndex(p => p.id === id)
          const polygon = polygons.splice(index, 1)[0]
          polygons.splice(index + 1, 0, polygon)
          set({ polygons })
        },
        moveUpPolygon: id => {
          const polygons = [...get().polygons]
          const index = polygons.findIndex(p => p.id === id)
          const polygon = polygons.splice(index, 1)[0]
          polygons.splice(index - 1, 0, polygon)
          set({ polygons })
        },
        clearPolygons: () => set({ polygons: [] }),
        selectedPolygonId: undefined,
        setSelectedPolygonId: (id?: PolygonId) => set({ selectedPolygonId: id }),
        selectedPolygonGroupId: undefined,
        setSelectedPolygonGroupId: (id?: PolygonGroupId) => set({ selectedPolygonGroupId: id }),
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
