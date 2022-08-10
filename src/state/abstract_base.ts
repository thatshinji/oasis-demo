import { Animator, Engine, Entity, Scene, LoadItem } from 'oasis-engine'

abstract class AbstractBase {
  abstract initEngine(): void
  abstract initScene(): void
  abstract initCameraEntity(): void
  abstract initLight(): void
  abstract init(): void
  abstract load(): Promise<this>
  abstract upgrade(path: string): void

  canvasId!: string
  curAction!: string
  nextAction!: string
  curActionIdx: number = 0
  nextActionIdx: number = this.curActionIdx + 1
  animationNames: string[] = []
  path!: LoadItem

  engine!: Engine
  cameraEntity!: Entity
  rootEntity!: Entity
  lightEntity!: Entity
  animator!: Animator
  scene!: Scene
}

export default AbstractBase
