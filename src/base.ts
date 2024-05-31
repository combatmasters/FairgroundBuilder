
import { Animator, AudioSource, ColliderLayer, Entity, GltfContainer, InputAction, PBGltfContainer, RaycastQueryType, Schemas, Transform, TransformTypeWithOptionals, engine, pointerEventsSystem, raycastSystem } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math';

const flowerbedShape:PBGltfContainer =  {
  src:"models/FloorBaseGrass_01.glb",
  invisibleMeshesCollisionMask: undefined,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
}

export class Base  {
  entity:Entity
  digEffort: number = 0;
  //room: Room | undefined;

  constructor(
    bedPos: TransformTypeWithOptionals,
    //room: Room
  ) 
  {

    this.entity = engine.addEntity()
    const targetEntity = this.entity
    //this.room = room
    GltfContainer.create(this.entity,flowerbedShape)
    Transform.create(this.entity,bedPos)




    //OnClick Spawn
    /*
    pointerEventsSystem.onPointerDown(
      {
      entity: this.entity,
      opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'IntX'
        }
      },
      function (res) {
        console.log("Interact Click X")

        console.log(res?.hit?.entityId)
        console.log(res?.hit?.meshName)
        console.log(res?.hit?.position)
        console.log(res?.hit?.position?.x)

        console.log(res?.hit?.length)
        console.log(res?.hit?.normalHit)


        //SECTOR calculation
        let xcoord = res?.hit?.position?.x
        let xcoordFloor
        let zcoord = res?.hit?.position?.z
        let zcoordFloor


        let sectorX = res?.hit?.position
        if(xcoord)
          {
            console.log("Floor X")
            xcoordFloor = Math.round(xcoord)
            console.log(xcoordFloor)

          }

        if(zcoord)
          {
            console.log("Floor Z")
            zcoordFloor = Math.round(zcoord)
            console.log(zcoordFloor)

          }

        const grid = new Grid({ position: Vector3.create(xcoordFloor, 0.02, zcoordFloor), scale: Vector3.create(1, 1, 1)})

        //room.send("digstart", res?.hit?.position);

      }


    )
      */
      //OnClick Spawn End




  }
 // public setupSpawnGround(x: number, z: number, what: string, state: number, spawned: number, isnew: boolean, room: Room): Ground {
 //   const ground = new Ground({ position: Vector3.create(x, 0.02, z), scale: Vector3.create(state/10, state/10, state/10)},room)
 //   return ground;
 // }

}

function localDirectionOptions(arg0: {
  collisionMask: number; originOffset: Vector3.MutableVector3; maxDistance: any; queryType: any; direction: any; continuous: boolean; // don't overuse the 'continuous' property as raycasting is expensive on performance
}): import("@dcl/sdk/ecs").RaycastSystemOptions {
  throw new Error('Function not implemented.');
}
