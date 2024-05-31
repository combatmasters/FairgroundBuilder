import { ColliderLayer, Entity, GltfContainer, InputAction, PBGltfContainer, Transform, TransformTypeWithOptionals, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";

let openUrl = 'sounds/door-open.mp3'
let closeUrl = 'sounds/door-close.mp3'

const ShapeRoad:PBGltfContainer =  { //ROAD
  src:"models/gridroad.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

const Shape1:PBGltfContainer =  { //1X1
  src:"models/grid1-smallattraction1.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

const Shape2:PBGltfContainer =  { //1X1
  src:"models/grid1-smallattraction2.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

const Shape3:PBGltfContainer =  { //2X2
  src:"models/grid1-smallattraction3.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

const Shape4:PBGltfContainer =  { //2X2
  src:"models/grid1-smallfood1.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

const Shape5:PBGltfContainer =  { //3X3????
  src:"models/grid1-smallfood2.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

const Shape6:PBGltfContainer =  { //2X2
  src:"models/grid22-karousel1.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

const Shape7:PBGltfContainer =  { //2X2
  src:"models/grid22-karousel2.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

const Shape8:PBGltfContainer =  { //2X2
  src:"models/grid22-karousel3.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

const Shape9:PBGltfContainer =  { //2X2
  src:"models/grid22-karousel4.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

const Shape10:PBGltfContainer =  { //3X3????
  src:"models/grid22-karousel5.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

const Shape11:PBGltfContainer =  { //2X2
  src:"models/grid22-karousel6baloon.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}
/*
const Shape12:PBGltfContainer =  { //3X3????
  src:"models/grid22-karousel7.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}
*/

export class Build  {
  entity:Entity

  type: number = 0;
  attraction: number = 0;
  groundPos: TransformTypeWithOptionals;

  constructor(
    groundPos: TransformTypeWithOptionals,
    type: number,
    attraction: number

  ) {

    this.entity = engine.addEntity()
    this.groundPos = groundPos
    this.type = type
    this.attraction = attraction

    switch (attraction) {
      case 0:
        GltfContainer.create(this.entity, ShapeRoad) // road

      break
      case 1:
        GltfContainer.create(this.entity, Shape1)

      break
      case 2:
        GltfContainer.create(this.entity, Shape2)

      break
      case 3:
        GltfContainer.create(this.entity, Shape3)

      break
      case 4:
        GltfContainer.create(this.entity, Shape4)

      break
      case 5:
        GltfContainer.create(this.entity, Shape5)

      break
      case 6:
        GltfContainer.create(this.entity, Shape6)

      break
      case 7:
        GltfContainer.create(this.entity, Shape7)

      break
      case 8:
        GltfContainer.create(this.entity, Shape8)
      break
      case 9:
        GltfContainer.create(this.entity, Shape9)
      break
      case 10:
        GltfContainer.create(this.entity, Shape10)
      break
      case 11:
        GltfContainer.create(this.entity, Shape11)
      break
      case 12:
        //GltfContainer.create(this.entity, Shape12)
      break
      default:
      break
    }
    Transform.create(this.entity,groundPos)

    pointerEventsSystem.onPointerDown(
      {
      entity: this.entity,
      opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Build InteractX'
        }
      },
       () => {
        console.log("Build click InteractXy")
        console.log(this.groundPos.position)

      }
    )
  }


  public changeSize(size: number) {
    console.log("changeSize click")
    console.log(size)
    console.log(size/10)

    const mutableTransform = Transform.getMutable(this.entity)
    mutableTransform.scale = Vector3.create(size/10, size/10, size/10)

  }

  public changeLocation(loc: TransformTypeWithOptionals) {
    console.log("changeLocation")
    const mutableTransform = Transform.getMutable(this.entity)
    mutableTransform.position = Vector3.create(loc.position?.x, loc.position?.y, loc.position?.z)
  }

  public getLocation() {
    console.log("getLocation")
    const mutableTransform = Transform.getMutable(this.entity)
    return mutableTransform.position
  }

}