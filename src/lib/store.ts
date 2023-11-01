import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type {
  PointGroupId,
  PointId,
  RawPoint,
  RawPointGroup,
  RawSuperGroup,
  SuperGroupId,
} from '#/lib/types'

interface Store {
  zoom: number
  setZoom: (zoom: number) => void
  scale: { width: number; height: number }
  setScale: ({ width, height }: { width: number; height: number }) => void
  decimals: number
  setDecimals: (decimals: number) => void
  isDragging: boolean
  setIsDragging: (isDragging: boolean) => void

  points: RawPoint[]
  setPoints: (points: RawPoint[]) => void
  addPoint: (point: RawPoint) => void
  addPointToPointGroup: (pointGroupId: PointGroupId, pointId: PointId) => void
  removePoint: (id: PointId) => void
  updatePoint: (id: PointId, point: Partial<RawPoint>) => void
  moveDownPoint: (id: PointId) => void
  moveUpPoint: (id: PointId) => void
  clearPoints: () => void
  selectedPointId?: PointId
  setSelectedPointId: (id?: PointId) => void

  moveDownPointInPointGroup: (pointGroupId: PointGroupId, pointId: PointId) => void
  moveUpPointInPointGroup: (pointGroupId: PointGroupId, pointId: PointId) => void
  removePointFromPointGroup: (pointGroupId: PointGroupId, pointId: PointId) => void

  pointGroups: RawPointGroup[]
  setPointGroups: (pointGroups: RawPointGroup[]) => void
  addPointGroup: (pointGroup: RawPointGroup) => void
  updatePointGroup: (id: PointGroupId, pointGroup: Partial<RawPointGroup>) => void
  addPointGroupToSuperGroup: (superGroupId: SuperGroupId, pointGroupId: PointGroupId) => void
  removePointGroup: (id: PointGroupId) => void
  moveDownPointGroup: (id: PointGroupId) => void
  moveUpPointGroup: (id: PointGroupId) => void
  clearPointGroups: () => void
  selectedPointGroupId?: PointGroupId
  setSelectedPointGroupId: (id?: PointGroupId) => void

  moveDownPointGroupInSuperGroup: (superGroupId: SuperGroupId, pointGroupId: PointGroupId) => void
  moveUpPointGroupInSuperGroup: (superGroupId: SuperGroupId, pointGroupId: PointGroupId) => void
  removePointGroupFromSuperGroup: (superGroupId: SuperGroupId, pointGroupId: PointGroupId) => void

  superGroups: RawSuperGroup[]
  setSuperGroups: (superGroups: RawSuperGroup[]) => void
  addSuperGroup: (superGroup: RawSuperGroup) => void
  updateSuperGroup: (id: SuperGroupId, superGroup: Partial<RawSuperGroup>) => void
  removeSuperGroup: (id: SuperGroupId) => void
  moveDownSuperGroup: (id: SuperGroupId) => void
  moveUpSuperGroup: (id: SuperGroupId) => void
  clearSuperGroups: () => void
  selectedSuperGroupId?: SuperGroupId
  setSelectedSuperGroupId: (id?: SuperGroupId) => void

  mode?: 'add-point' | 'select'
  setMode: (mode?: 'add-point' | 'select') => void
  backgroundImageSrc?: string
  setBackgroundImageSrc: (src?: string) => void
  modalShown?: 'point' | 'point-group' | 'super-group'
  setModalShown: (modalShown?: 'point' | 'point-group' | 'super-group') => void
  showSinglePoints: boolean
  setShowSinglePoints: (showSinglePoints: boolean) => void
  showSinglePointGroups: boolean
  setShowSinglePointGroups: (showSinglePointGroups: boolean) => void
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
        moveDownPointInPointGroup: (pointGroupId, pointId) => {
          const pointGroups = [...get().pointGroups]
          const index = pointGroups.findIndex(p => p.id === pointGroupId)
          const pointGroup = pointGroups[index]
          const pointIndex = pointGroup.pointIds.findIndex(id => id === pointId)
          const point = pointGroup.pointIds.splice(pointIndex, 1)[0]
          pointGroup.pointIds.splice(pointIndex + 1, 0, point)
          pointGroups.splice(index, 1, pointGroup)
          set({ pointGroups })
        },
        moveUpPointInPointGroup: (pointGroupId, pointId) => {
          const pointGroups = [...get().pointGroups]
          const index = pointGroups.findIndex(p => p.id === pointGroupId)
          const pointGroup = pointGroups[index]
          const pointIndex = pointGroup.pointIds.findIndex(id => id === pointId)
          const point = pointGroup.pointIds.splice(pointIndex, 1)[0]
          pointGroup.pointIds.splice(pointIndex - 1, 0, point)
          pointGroups.splice(index, 1, pointGroup)
          set({ pointGroups })
        },
        removePointFromPointGroup: (pointGroupId, pointId) => {
          const pointGroups = [...get().pointGroups]
          const index = pointGroups.findIndex(p => p.id === pointGroupId)
          const pointGroup = pointGroups[index]
          const pointIndex = pointGroup.pointIds.findIndex(id => id === pointId)
          pointGroup.pointIds.splice(pointIndex, 1)
          pointGroups.splice(index, 1, pointGroup)
          set({ pointGroups })
        },
        pointGroups: [],
        setPointGroups: pointGroups => set({ pointGroups }),
        addPointGroup: pointGroup => {
          set({ pointGroups: [...get().pointGroups, pointGroup] })
          if (get().selectedSuperGroupId) {
            set({
              superGroups: get().superGroups.map(sg =>
                sg.id === get().selectedSuperGroupId
                  ? { ...sg, pointGroupIds: [...sg.pointGroupIds, pointGroup.id] }
                  : sg,
              ),
            })
          }
        },
        updatePointGroup: (id, pointGroup) =>
          set({
            pointGroups: get().pointGroups.map(p => (p.id === id ? { ...p, ...pointGroup } : p)),
          }),
        addPointGroupToSuperGroup: (superGroupId, pointGroupId) =>
          set({
            superGroups: get().superGroups.map(sg =>
              sg.id === superGroupId
                ? { ...sg, pointGroupIds: [...sg.pointGroupIds, pointGroupId] }
                : sg,
            ),
          }),
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

        moveDownPointGroupInSuperGroup: (superGroupId, pointGroupId) => {
          const superGroups = [...get().superGroups]
          const index = superGroups.findIndex(p => p.id === superGroupId)
          const superGroup = superGroups[index]
          const pointIndex = superGroup.pointGroupIds.findIndex(id => id === pointGroupId)
          const point = superGroup.pointGroupIds.splice(pointIndex, 1)[0]
          superGroup.pointGroupIds.splice(pointIndex + 1, 0, point)
          superGroups.splice(index, 1, superGroup)
          set({ superGroups })
        },
        moveUpPointGroupInSuperGroup: (superGroupId, pointGroupId) => {
          const superGroups = [...get().superGroups]
          const index = superGroups.findIndex(p => p.id === superGroupId)
          const superGroup = superGroups[index]
          const pointIndex = superGroup.pointGroupIds.findIndex(id => id === pointGroupId)
          const point = superGroup.pointGroupIds.splice(pointIndex, 1)[0]
          superGroup.pointGroupIds.splice(pointIndex - 1, 0, point)
          superGroups.splice(index, 1, superGroup)
          set({ superGroups })
        },
        removePointGroupFromSuperGroup: (superGroupId, pointGroupId) => {
          const superGroups = [...get().superGroups]
          const index = superGroups.findIndex(p => p.id === superGroupId)
          const superGroup = superGroups[index]
          const pointIndex = superGroup.pointGroupIds.findIndex(id => id === pointGroupId)
          superGroup.pointGroupIds.splice(pointIndex, 1)
          superGroups.splice(index, 1, superGroup)
          set({ superGroups })
        },
        superGroups: [],
        setSuperGroups: superGroups => set({ superGroups }),
        addSuperGroup: superGroup => set({ superGroups: [...get().superGroups, superGroup] }),
        updateSuperGroup: (id, superGroup) =>
          set({
            superGroups: get().superGroups.map(sg =>
              sg.id === id ? { ...sg, ...superGroup } : sg,
            ),
          }),
        removeSuperGroup: id =>
          set({
            superGroups: get().superGroups.filter(sg => sg.id !== id),
            selectedSuperGroupId: undefined,
          }),
        moveDownSuperGroup: id => {
          const superGroups = [...get().superGroups]
          const index = superGroups.findIndex(p => p.id === id)
          const superGroup = superGroups.splice(index, 1)[0]
          superGroups.splice(index + 1, 0, superGroup)
          set({ superGroups })
        },
        moveUpSuperGroup: id => {
          const superGroups = [...get().superGroups]
          const index = superGroups.findIndex(p => p.id === id)
          const superGroup = superGroups.splice(index, 1)[0]
          superGroups.splice(index - 1, 0, superGroup)
          set({ superGroups })
        },
        clearSuperGroups: () => set({ superGroups: [], selectedSuperGroupId: undefined }),

        selectedSuperGroupId: undefined,
        setSelectedSuperGroupId: (id?: SuperGroupId) => set({ selectedSuperGroupId: id }),
        selectedPointGroupId: undefined,
        setSelectedPointGroupId: (id?: SuperGroupId) => set({ selectedPointGroupId: id }),

        mode: 'select',
        setMode: mode => set({ mode }),
        backgroundImageSrc: undefined,
        setBackgroundImageSrc: src => set({ backgroundImageSrc: src }),
        modalShown: undefined,
        setModalShown: modalShown => set({ modalShown }),

        showSinglePoints: true,
        setShowSinglePoints: showSinglePoints => set({ showSinglePoints }),
        showSinglePointGroups: true,
        setShowSinglePointGroups: showSinglePointGroups => set({ showSinglePointGroups }),
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
