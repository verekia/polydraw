export type PointId = string
export type PointGroupId = string
export type SuperGroupId = string

export type RawPoint = {
  id: PointId
  name?: string
  color?: string
  x: number
  y: number
  z?: number
  rotZ?: number
}

export type RawPointGroup = {
  id: PointGroupId
  isPolygon: boolean
  name?: string
  color?: string
  pointIds: PointId[]
}

export type RawSuperGroup = {
  id: SuperGroupId
  name?: string
  color?: string
  pointGroupIds: PointGroupId[]
}
