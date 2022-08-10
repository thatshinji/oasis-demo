import { DirectLight, Vector3, LoadItem } from 'oasis-engine'
import Base from './base'

class Fox extends Base {
  constructor(canvasId: string, path: LoadItem) {
    super(canvasId, path)
  }
  getCurActionIdx(): number {
    return this.curActionIdx
  }
  initLight(): void {
    const lightNode = this.rootEntity.createChild('light_node')
    lightNode.addComponent(DirectLight).intensity = 0.6
    lightNode.transform.lookAt(new Vector3(0, 0, 1))
    lightNode.transform.rotate(new Vector3(0, 90, 0))
  }
  stop() {
    this.engine.pause()
  }
  restart() {
    this.changeAnimation('walk')
    this.engine.run()
  }
  // addScript(Script) {
  //   this.rootEntity.addComponent(Script)
  // }
}

export default Fox
