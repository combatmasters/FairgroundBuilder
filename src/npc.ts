import { Animator, ColliderLayer, Entity, GltfContainer, InputAction, MeshRenderer, PBGltfContainer, Schemas, Transform, TransformTypeWithOptionals, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";

let openUrl = 'sounds/door-open.mp3'
let closeUrl = 'sounds/door-close.mp3'

const npcShape:PBGltfContainer =  {
  src:"models/npc.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

const npcShape2:PBGltfContainer =  {
  src:"models/npc2.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

const npcShape3:PBGltfContainer =  {
  src:"models/npc3.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

const npcShape4:PBGltfContainer =  {
  src:"models/npc4.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

export class Npc  {
  entity:Entity
  npcPos: TransformTypeWithOptionals;
  id: String;
  asset: number;

  constructor(
    npcPos: TransformTypeWithOptionals,
    id: String,
    asset: number
  ) {

    this.entity = engine.addEntity()
    this.npcPos = npcPos
    this.id = id
    this.asset = asset

    switch (asset) {
      case 0:
        GltfContainer.create(this.entity, npcShape)

      break
      case 1:
        GltfContainer.create(this.entity, npcShape2)

      break
      case 2:
        GltfContainer.create(this.entity, npcShape3)

      break
      case 3:
        GltfContainer.create(this.entity, npcShape4)

      break
      default:
      break
    }



    Transform.create(this.entity,npcPos)

    Animator.create(this.entity, {
      states: [
        {
          clip: 'idle',
          loop: true,
          playing: false,
          shouldReset: false,
        },
        {
          clip: 'run',
          loop: true,
          playing: false,
          shouldReset: false,
        }
      ]
    })

  }

  public changeLocation(loc: TransformTypeWithOptionals) {
    console.log("changeLocation")

    const mutableTransform = Transform.getMutable(this.entity)
    mutableTransform.position = Vector3.create(loc.position?.x, loc.position?.y, loc.position?.z)

  }

}