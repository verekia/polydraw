# 🔺 PolyDraw

Use it on [**polydraw.v1v2.io**](https://polydraw.v1v2.io)

## Resolving your JSON data

Here is what a PolyDraw exported JSON file looks like:

```json
{
  "points": [
    { "id": "IXXp8", "x": 21.4, "y": 54.6 },
    { "id": "h8axL", "x": 25.4, "y": 71.6 },
    { "id": "A8LYy", "x": 42.8, "y": 82.4 },
    { "id": "05EtD", "x": 69.6, "y": 81.2 }
  ],
  "pointGroups": [
    {
      "id": "G5kjN",
      "pointIds": ["IXXp8", "h8axL", "A8LYy", "05EtD"],
      "name": "forest1"
    }
  ],
  "superGroups": [{ "pointGroupIds": ["G5kjN"], "name": "forests" }]
}
```

In your application code, you will likely want to resolve `pointIds` and `pointGroupIds` to have direct access to the point and point group objects. Here is a way to do it that removes `id`, `pointIds`, and `pointGroupIds` fields from the final object (remove the `!` operators if you are not using TypeScript).

```ts
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
```

## Known issues

- Custom JSON keeps showing the previous value of other points.
- Number inputs behave weird sometimes, cannot type dot.
