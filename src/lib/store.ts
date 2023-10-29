import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import {
  PointGroupId,
  PointId,
  PolygonGroupId,
  PolygonId,
  RawPoint,
  RawPointGroup,
  RawPolygon,
  RawPolygonGroup,
} from '#/lib/types'

interface Store {
  zoom: number
  setZoom: (zoom: number) => void
  scale: { width: number; height: number }
  setScale: ({ width, height }: { width: number; height: number }) => void
  decimals: number
  setDecimals: (decimals: number) => void
  selectedPointId?: PointId
  setSelectedPointId: (id?: PointId) => void
  isDragging: boolean
  setIsDragging: (isDragging: boolean) => void
  points: RawPoint[]
  setPoints: (points: RawPoint[]) => void
  addPoint: (point: RawPoint) => void
  addPointToPointGroup: (pointGroupId: PointGroupId, pointId: PointId) => void
  addPointToPolygon: (polygonId: PolygonId, pointId: PointId) => void
  removePoint: (id: PointId) => void
  updatePoint: (id: PointId, point: Partial<RawPoint>) => void
  moveDownPoint: (id: PointId) => void
  moveUpPoint: (id: PointId) => void
  clearPoints: () => void
  pointGroups: RawPointGroup[]
  setPointGroups: (pointGroups: RawPointGroup[]) => void
  addPointGroup: (pointGroup: RawPointGroup) => void
  removePointGroup: (id: PointGroupId) => void
  moveDownPointGroup: (id: PointGroupId) => void
  moveUpPointGroup: (id: PointGroupId) => void
  clearPointGroups: () => void
  polygonGroups: RawPolygonGroup[]
  setPolygonGroups: (polygonGroups: RawPolygonGroup[]) => void
  addPolygonGroup: (polygonGroup: RawPolygonGroup) => void
  removePolygonGroup: (id: PolygonGroupId) => void
  moveDownPolygonGroup: (id: PolygonGroupId) => void
  moveUpPolygonGroup: (id: PolygonGroupId) => void
  clearPolygonGroups: () => void
  polygons: RawPolygon[]
  setPolygons: (polygons: RawPolygon[]) => void
  addPolygon: (polygon: RawPolygon) => void
  removePolygon: (id: PolygonId) => void
  moveDownPolygon: (id: PolygonId) => void
  moveUpPolygon: (id: PolygonId) => void
  clearPolygons: () => void
  selectedPolygonId?: PolygonId
  setSelectedPolygonId: (id?: PolygonId) => void
  selectedPolygonGroupId?: PolygonGroupId
  setSelectedPolygonGroupId: (id?: PolygonGroupId) => void
  selectedPointGroupId?: PointGroupId
  setSelectedPointGroupId: (id?: PointGroupId) => void
  mode?: 'add-point'
  setMode: (mode?: 'add-point') => void
  backgroundImageSrc?: string
  setBackgroundImageSrc: (src?: string) => void
  modalShown?: 'point' | 'point-group' | 'polygon' | 'polygon-group'
  setModalShown: (modalShown?: 'point' | 'point-group' | 'polygon' | 'polygon-group') => void
  showSinglePoints: boolean
  setShowSinglePoints: (showSinglePoints: boolean) => void
}

export const useStore = create<Store>()(
  devtools(
    persist(
      (set, get) => ({
        zoom: 5,
        setZoom: zoom => set({ zoom }),
        scale: { width: 100, height: 100 },
        setScale: ({ width, height }: { width: number; height: number }) =>
          set({ scale: { width, height } }),
        decimals: 2,
        setDecimals: decimals => set({ decimals }),
        selectedPointId: undefined,
        setSelectedPointId: (id?: PointId) => set({ selectedPointId: id }),
        isDragging: false,
        setIsDragging: isDragging => set({ isDragging }),
        points: [],
        setPoints: points => set({ points }),
        addPoint: point => {
          set({ points: [...get().points, point] })
          if (get().selectedPolygonId) {
            set({
              polygons: get().polygons.map(p =>
                p.id === get().selectedPolygonId
                  ? { ...p, pointIds: [...p.pointIds, point.id] }
                  : p,
              ),
            })
          }
          if (get().selectedPointGroupId) {
            set({
              pointGroups: get().pointGroups.map(p =>
                p.id === get().selectedPointGroupId
                  ? { ...p, pointIds: [...p.pointIds, point.id] }
                  : p,
              ),
            })
          }
        },
        addPointToPointGroup: (pointGroupId, pointId) =>
          set({
            pointGroups: get().pointGroups.map(p =>
              p.id === pointGroupId ? { ...p, pointIds: [...p.pointIds, pointId] } : p,
            ),
          }),
        addPointToPolygon: (polygonId, pointId) =>
          set({
            polygons: get().polygons.map(p =>
              p.id === polygonId ? { ...p, pointIds: [...p.pointIds, pointId] } : p,
            ),
          }),
        updatePoint: (id, point) =>
          set({ points: get().points.map(p => (p.id === id ? { ...p, ...point } : p)) }),
        removePoint: id =>
          set({ points: get().points.filter(p => p.id !== id), selectedPointId: undefined }),
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
        clearPoints: () => set({ points: [], selectedPointId: undefined }),
        pointGroups: [],
        setPointGroups: pointGroups => set({ pointGroups }),
        addPointGroup: pointGroup => set({ pointGroups: [...get().pointGroups, pointGroup] }),
        removePointGroup: id =>
          set({
            pointGroups: get().pointGroups.filter(p => p.id !== id),
            selectedPointGroupId: undefined,
          }),
        moveDownPointGroup: id => {
          const pointGroups = [...get().pointGroups]
          const index = pointGroups.findIndex(p => p.id === id)
          const pointGroup = pointGroups.splice(index, 1)[0]
          pointGroups.splice(index + 1, 0, pointGroup)
          set({ pointGroups })
        },
        moveUpPointGroup: id => {
          const pointGroups = [...get().pointGroups]
          const index = pointGroups.findIndex(p => p.id === id)
          const pointGroup = pointGroups.splice(index, 1)[0]
          pointGroups.splice(index - 1, 0, pointGroup)
          set({ pointGroups })
        },
        clearPointGroups: () => set({ pointGroups: [], selectedPointGroupId: undefined }),
        polygonGroups: [],
        setPolygonGroups: polygonGroups => set({ polygonGroups }),
        addPolygonGroup: polygonGroup =>
          set({ polygonGroups: [...get().polygonGroups, polygonGroup] }),
        removePolygonGroup: id =>
          set({
            polygonGroups: get().polygonGroups.filter(p => p.id !== id),
            selectedPolygonGroupId: undefined,
          }),
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
        clearPolygonGroups: () => set({ polygonGroups: [], selectedPolygonGroupId: undefined }),
        polygons: [],
        setPolygons: polygons => set({ polygons }),
        addPolygon: polygon => {
          set({ polygons: [...get().polygons, polygon] })
          if (get().selectedPolygonGroupId) {
            set({
              polygonGroups: get().polygonGroups.map(p =>
                p.id === get().selectedPolygonGroupId
                  ? { ...p, polygonIds: [...p.polygonIds, polygon.id] }
                  : p,
              ),
            })
          }
        },
        removePolygon: id =>
          set({ polygons: get().polygons.filter(p => p.id !== id), selectedPolygonId: undefined }),
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
        clearPolygons: () => set({ polygons: [], selectedPolygonId: undefined }),
        selectedPolygonId: undefined,
        setSelectedPolygonId: (id?: PolygonId) =>
          set({ selectedPolygonId: id, selectedPointGroupId: undefined }),
        selectedPolygonGroupId: undefined,
        setSelectedPolygonGroupId: (id?: PolygonGroupId) =>
          set({ selectedPolygonGroupId: id, selectedPointGroupId: undefined }),
        selectedPointGroupId: undefined,
        setSelectedPointGroupId: (id?: PointGroupId) =>
          set({
            selectedPointGroupId: id,
            selectedPolygonId: undefined,
            selectedPolygonGroupId: undefined,
          }),
        mode: 'add-point',
        setMode: mode => set({ mode }),
        backgroundImageSrc: undefined,
        setBackgroundImageSrc: src => set({ backgroundImageSrc: src }),
        modalShown: undefined,
        setModalShown: modalShown => set({ modalShown }),
        showSinglePoints: true,
        setShowSinglePoints: showSinglePoints => set({ showSinglePoints }),
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
