export type PolygonGroupId = string
export type PolygonId = string
export type PointGroupId = string
export type PointId = string

export type RawPoint = {
  id: PointId
  name?: string
  x: number
  y: number
  z?: number
  rotZ?: number
}
export type RawPointGroup = { id: PointGroupId; name?: string; pointIds: PointId[] }
export type RawPolygon = { id: PolygonId; name?: string; pointIds: PointId[] }
export type RawPolygonGroup = { id: PolygonGroupId; name?: string; polygonIds: PolygonId[] }
