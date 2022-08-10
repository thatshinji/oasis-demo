// import { DirectLight, Vector3 } from 'oasis-engine'
import { OrbitControl } from '@oasis-engine/controls'
import { Camera, Vector3, GLTFResource } from 'oasis-engine'
import Base from './base'

class Person extends Base {
  // async load(): Promise<this> {
  //   const root = await this.engine.resourceManager.load<GLTFResource>(this.path!)
  //   const [a, b] = root as unknown as Array<any>
  //   console.log(a, b)
  //   return this
  // }
  initCameraEntity(): void {
    this.cameraEntity = this.rootEntity.createChild(`${this.canvasId}-person`)
    this.cameraEntity.transform.position = new Vector3(0, 1, 5)
    this.cameraEntity.addComponent(Camera)
    const controller = this.cameraEntity.addComponent(OrbitControl)
    // 设置相机控件
    controller.target = new Vector3(0, 1, 0)
    controller.enablePan = false
    controller.enableZoom = false
    controller.minPolarAngle = 0
    controller.enableRotate = false
  }
}

export default Person
