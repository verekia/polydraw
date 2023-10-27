export type PolygonGroupId = string
export type PolygonId = string
export type PointId = string

export type Point = { id: PointId; name?: string; x: number; y: number; z?: number; rotZ?: number }
export type Polygon = { id: PolygonId; name?: string; pointIds: PointId[] }
export type PolygonGroup = { id: PolygonGroupId; name?: string; polygonIds: PolygonId[] }
