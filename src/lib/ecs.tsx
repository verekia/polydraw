import { World } from 'miniplex'
import { createReactAPI } from 'miniplex-react'
import { nanoid } from 'nanoid'

export type SubEntity<E, C extends readonly (keyof E)[]> = Required<Pick<E, C[number]>>

export type Entity = {
  id?: string
  point?: { x: number; y: number; z?: number; rotZ?: number }
}

export const world = new World<Entity>()

const makeBucket = <K extends keyof Entity>(components: readonly K[]) => world.with(...components)

const pointComps = ['id', 'point'] as const
export type Point = SubEntity<Entity, typeof pointComps>
export const points = makeBucket<keyof Point>(pointComps)

export const ECS = createReactAPI(world)

type Props<E extends Entity> = Omit<Parameters<typeof ECS.Entities<E>>[0], 'in'>

export const PointEntities = (props: Props<Point>) => <ECS.Entities in={points} {...props} />

export const createPoint = ({ x, y }: { x: number; y: number }) =>
  world.add<Point>({ id: nanoid(), point: { x, y } })
