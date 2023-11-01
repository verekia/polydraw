import rawData from './raw-data.json'

const idToPoint = new Map(rawData.points.map(({ id, ...point }) => [id, point]))
const idToPointGroup = new Map(
  rawData.pointGroups.map(({ id, pointIds, ...pointGroup }) => [
    id,
    { ...pointGroup, points: pointIds.map(id => idToPoint.get(id)!) },
  ]),
)

const resolvedData = {
  points: Array.from(idToPoint.values()),
  pointGroups: rawData.pointGroups.map(({ id, pointIds, ...pointGroup }) => ({
    ...pointGroup,
    points: pointIds.map(id => idToPoint.get(id)!),
  })),
  superGroups: rawData.superGroups.map(({ pointGroupIds, ...superGroup }) => ({
    ...superGroup,
    pointGroups: pointGroupIds.map(id => idToPointGroup.get(id)!),
  })),
}

export default resolvedData
