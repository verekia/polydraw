# polydraw

- save in localStorage
- export options:

  - Include editor metadata?
  - Normalized with IDs or pre-joined with duplicate points
  - Copy JS import and join code

- hide/show toggle for all entities

Crash on .x after deleting a point in a polygon:

as="polygon"
points={pg.points.map(p => `${p.x
