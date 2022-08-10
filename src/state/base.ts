import { OrbitControl } from '@oasis-engine/controls'
import { Animator, Camera, GLTFResource, Vector3, WebGLEngine, LoadItem } from 'oasis-engine'
import AbstractBase from './abstract_base'

class Base extends AbstractBase {
  constructor(canvasId: string, path?: LoadItem) {
    super()
    this.canvasId = canvasId
    this.path = path!
    this.init()
  }
  init(): void {
    this.initEngine()
    this.initScene()
    this.initCameraEntity()
    this.initLight()
  }

  initEngine(): void {
    const engine = new WebGLEngine(this.canvasId || 'canvas', { alpha: true })
    // const pixelRatio = window.devicePixelRatio
    // const scale = 1
    // engine.canvas.height = window.innerWidth / pixelRatio / scale
    // engine.canvas.width = window.innerWidth / pixelRatio / scale
    engine.canvas.resizeByClientSize()
    this.engine = engine
  }

  initScene(): void {
    this.scene = this.engine.sceneManager.activeScene
    this.scene.background.solidColor.setValue(255, 255, 255, 0) // 设置背景颜色及透明度
    this.rootEntity = this.scene.createRootEntity()
  }

  initCameraEntity(): void {
    this.cameraEntity = this.rootEntity.createChild(`${this.canvasId}-camera`)
    this.cameraEntity.transform.position = new Vector3(0, 1, 5)
    this.cameraEntity.addComponent(Camera)
    this.cameraEntity.addComponent(OrbitControl).target = new Vector3(0, 1, 0)
  }

  initLight(): void {
    this.lightEntity = this.rootEntity.createChild(`${this.canvasId}-light`)
  }

  async load(): Promise<this> {
    const root = await this.engine.resourceManager.load<GLTFResource>(this.path)
    const { defaultSceneRoot } = root
    this.rootEntity.addChild(defaultSceneRoot)
    this.animator = defaultSceneRoot.getComponent(Animator)
    if (this.animator) {
      this.animationNames = this.animator.animatorController.layers[0].stateMachine.states.map((state) => state.name)
      this.curAction = this.animationNames[this.curActionIdx]
      this.nextAction = this.animationNames[this.curActionIdx + 1]
      this.animator.play(this.animationNames[this.curActionIdx])
    }
    this.engine.run()
    return this
  }
  upgrade(path: string): void {}

  changeAnimation(action: number | string): void {
    if (typeof action === 'number') {
      this.animator.play(this.animationNames[action])
    } else {
      this.animator.play(action)
    }
  }
}

export default Base
