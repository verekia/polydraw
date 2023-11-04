import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { createId } from '#/lib/nanoid'

import type {
  PointGroupId,
  PointId,
  RawPoint,
  RawPointGroup,
  RawSuperGroup,
  SuperGroupId,
} from '#/lib/types'

export interface Store {
  zoom: number
  setZoom: (zoom: number) => void
  scale: { width: number; height: number }
  setScale: ({ width, height }: { width: number; height: number }) => void
  decimals: number
  setDecimals: (decimals: number) => void
  pointDraggedId?: PointId
  setPointDraggedId: (id?: PointId) => void

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

  subdivide: (pointAId: PointId, pointBId: PointId) => void
}

export const defaultStateValues = {
  zoom: 5,
  scale: { width: 100, height: 100 },
  decimals: 2,
  selectedPointId: undefined,
  pointDraggedId: undefined,
  points: [],
  pointGroups: [],
  superGroups: [],
  selectedSuperGroupId: undefined,
  selectedPointGroupId: undefined,
  mode: 'select' as 'select' | 'add-point',
  backgroundImageSrc: undefined,
  modalShown: undefined,
  showSinglePoints: true,
  showSinglePointGroups: true,
}

export const useStore = create<Store>()(
  devtools(
    persist(
      (set, get) => ({
        ...defaultStateValues,
        setZoom: zoom => set({ zoom }),
        setScale: ({ width, height }: { width: number; height: number }) =>
          set({ scale: { width, height } }),
        setDecimals: decimals => set({ decimals }),
        setSelectedPointId: (id?: PointId) => set({ selectedPointId: id }),
        setPointDraggedId: (id?: PointId) => set({ pointDraggedId: id }),
        setPoints: points => set({ points }),
        addPoint: point => {
          const currentlySelectedPointId = get().selectedPointId
          const points = get().points
          const currentlySelectedPoint = points.find(p => p.id === currentlySelectedPointId)

          const newPoints =
            currentlySelectedPoint && points.includes(currentlySelectedPoint)
              ? [
                  ...points.slice(0, points.indexOf(currentlySelectedPoint) + 1),
                  point,
                  ...points.slice(points.indexOf(currentlySelectedPoint) + 1),
                ]
              : [...points, point]

          set({ points: newPoints, selectedPointId: point.id })

          set({
            pointGroups: get().pointGroups.map(p => {
              const newPointIds =
                currentlySelectedPointId && p.pointIds.includes(currentlySelectedPointId)
                  ? [
                      ...p.pointIds.slice(0, p.pointIds.indexOf(currentlySelectedPointId) + 1),
                      point.id,
                      ...p.pointIds.slice(p.pointIds.indexOf(currentlySelectedPointId) + 1),
                    ]
                  : [...p.pointIds, point.id]

              return p.id === get().selectedPointGroupId ? { ...p, pointIds: newPointIds } : p
            }),
          })
        },
        addPointToPointGroup: (pointGroupId, pointId) =>
          set({
            pointGroups: get().pointGroups.map(p =>
              p.id === pointGroupId ? { ...p, pointIds: [...p.pointIds, pointId] } : p,
            ),
          }),
        updatePoint: (id, point) =>
          set({ points: get().points.map(p => (p.id === id ? { ...p, ...point } : p)) }),
        removePoint: id => {
          set({
            points: get().points.filter(p => p.id !== id),
            selectedPointId: undefined,
            pointGroups: get().pointGroups.map(p => ({
              ...p,
              pointIds: p.pointIds.filter(pointId => pointId !== id),
            })),
          })
        },
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
        removePointGroup: id => {
          set({
            pointGroups: get().pointGroups.filter(p => p.id !== id),
            selectedPointGroupId: undefined,
          })
          set({
            superGroups: get().superGroups.map(sg => ({
              ...sg,
              pointGroupIds: sg.pointGroupIds.filter(pointGroupId => pointGroupId !== id),
            })),
          })
        },
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
        setSelectedSuperGroupId: (id?: SuperGroupId) => set({ selectedSuperGroupId: id }),
        setSelectedPointGroupId: (id?: SuperGroupId) => set({ selectedPointGroupId: id }),

        setMode: mode => set({ mode }),
        setBackgroundImageSrc: src => set({ backgroundImageSrc: src }),
        setModalShown: modalShown => set({ modalShown }),

        setShowSinglePoints: showSinglePoints => set({ showSinglePoints }),
        setShowSinglePointGroups: showSinglePointGroups => set({ showSinglePointGroups }),

        subdivide: (pointAId: PointId, pointBId: PointId) => {
          const pointA = get().points.find(p => p.id === pointAId)
          const pointB = get().points.find(p => p.id === pointBId)

          if (!pointA || !pointB) {
            return
          }

          const midPoint: RawPoint = {
            id: createId(),
            x: (pointA.x + pointB.x) / 2,
            y: (pointA.y + pointB.y) / 2,
          }

          const pointGroups = get().pointGroups.map(pg => {
            const aIndex = pg.pointIds.indexOf(pointA.id)
            const bIndex = pg.pointIds.indexOf(pointB.id)

            const isAdjacent =
              aIndex === (bIndex + 1) % pg.pointIds.length ||
              bIndex === (aIndex + 1) % pg.pointIds.length

            if (!isAdjacent) {
              return pg
            }

            // Written by ChatGPT
            if (aIndex !== -1 && bIndex !== -1) {
              // Determine the correct index to insert the new point
              let insertIndex
              if (aIndex < bIndex || (aIndex === pg.pointIds.length - 1 && bIndex === 0)) {
                insertIndex = (aIndex + 1) % pg.pointIds.length
              } else if (bIndex < aIndex || (bIndex === pg.pointIds.length - 1 && aIndex === 0)) {
                insertIndex = (bIndex + 1) % pg.pointIds.length
              } else {
                // This case handles when aIndex and bIndex are the same, which is an unexpected scenario.
                // You can decide how to handle this case based on your application's needs.
                insertIndex = aIndex + 1
              }

              // Create a copy of pointIds and insert the new point's ID
              const newPointIds = [...pg.pointIds]
              newPointIds.splice(insertIndex, 0, midPoint.id)
              return { ...pg, pointIds: newPointIds }
            }
            return pg
          })

          set({ pointGroups, points: [...get().points, midPoint], selectedPointId: midPoint.id })
        },
      }),
      {
        name: 'polydraw',
        skipHydration: true,
        partialize: state =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) =>
                ![
                  'backgroundImageSrc',
                  'pointDraggedId',
                  'modalShown',
                  'selectedSuperGroupId',
                  'selectedPointGroupId',
                  'selectedPointId',
                  'mode',
                ].includes(key),
            ),
          ),
      },
    ),
  ),
)
