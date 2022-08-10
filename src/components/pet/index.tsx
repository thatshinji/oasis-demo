import React, { useEffect, useState } from 'react'
import Base from '@/state/base'
import { Animator, GLTFResource } from 'oasis-engine'

export type PetProps = {
  Child: any
}
const Pet = ({ Child }: PetProps) => {
  const [p, setPerson] = useState<Base>()
  const [animations, setAnimations] = useState<string[]>([])
  useEffect(() => {
    try {
      // new Child(
      //   'canvas-1',
      //   'https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb',
      //   // 'https://gw.alipayobjects.com/os/OasisHub/267000040/9994/%25E5%25BD%2592%25E6%25A1%25A3.gltf',
      // )
      //   .load()
      //   .then((eng: Base) => {
      //     console.log(eng, 'eng')
      //     setPerson(eng)
      //     setAnimations(eng.animationNames)
      //   })
      const p: Base = new Child(
        'canvas-1',
        'https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb',
        // 'https://gw.alipayobjects.com/os/OasisHub/267000040/9994/%25E5%25BD%2592%25E6%25A1%25A3.gltf',
      )
      p.engine.resourceManager
        .load<GLTFResource>(p.path)
        .then((gltf) => {
          const { defaultSceneRoot } = gltf
          p.rootEntity.addChild(defaultSceneRoot)
          p.animator = defaultSceneRoot.getComponent(Animator)
          if (p.animator) {
            p.animationNames = p.animator.animatorController.layers[0].stateMachine.states.map((state) => state.name)
            p.curAction = p.animationNames[p.curActionIdx]
            p.nextAction = p.animationNames[p.curActionIdx + 1]
            p.animator.play(p.animationNames[p.curActionIdx])
          }
          p.engine.run()
          setPerson(p)
          setAnimations(p.animationNames)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const action = (name: string) => {
    p?.changeAnimation(name)
  }
  // const upgrade = () => {}
  return (
    <div>
      <canvas id="canvas-1" style={{ height: 500, width: 375 }}></canvas>
      <div className="actions">
        {animations?.map((item: string, idx: number) => (
          <div className="action-item" onClick={() => action(item)} key={idx}>
            {item}
          </div>
        ))}
      </div>
      {/* <div onClick={upgrade}>upgrade</div> */}
    </div>
  )
}

export default Pet
