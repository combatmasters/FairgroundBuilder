// We define the empty imports so the auto-complete feature works as expected.
import "./polyfill/delcares";

import { Vector3 } from '@dcl/sdk/math'
import { Animator, ColliderLayer, EasingFunction, Entity, GltfContainer, InputAction, MeshRenderer, PBGltfContainer, PBTween, PBTweenSequence, PointerEventType, RaycastQueryType, Schemas, Transform, Tween, TweenLoop, TweenSequence, engine, inputSystem, raycastSystem, tweenSystem } from '@dcl/sdk/ecs'

import { changeColorSystem, circularSystem } from './systems'
import { setupUi } from './ui'

import { Base } from './base';
import { Build } from './build';
import { Npc } from './npc';
import { connect } from './connection';
import { log } from './back-ports/backPorts';
import { changeCoinsCount, changeNpcCount, hideClientMessage, setBuildTabVisible, setInfoUIVisible, showClientMessage, staticUI } from "./health.ui";

import { setup360 } from './360viewSetup'
import * as utils from '@dcl-sdk/utils'

//#region SkyBox
const folderNumber = "1"

setup360(folderNumber)
/*
const innerBarrier = engine.addEntity()
GltfContainer.create(innerBarrier, {
  src: 'models/skyboxinnerbarrier.glb',
})
Transform.create(innerBarrier, { position: Vector3.create(48, 48, 48) })
*/
//Movement System Start 
// define custom component
const PathTransportData = {
  path: Schemas.Array(Schemas.Vector3),
  start: Schemas.Vector3,
  end: Schemas.Vector3,
  fraction: Schemas.Float,
  speed: Schemas.Float,
  pathTargetIndex: Schemas.Int,
  reachedEnd: Schemas.Boolean,
}

export const LerpTransformComponent = engine.defineComponent(
  'LerpTransformComponent',
  PathTransportData
)


//Movement System End

let builderState = false
let positioningSystemActive = false

let build = new Build({ position: Vector3.create(1, 0.02, 1), scale: Vector3.create(0, 0, 0)}, 0, 0)


export function enterBuilderMode(type: number, attraction: number) {
  console.log("enterBuilderMode TRUE")
  if(builderState == false){
    console.log("builderState == false")
    builderState = true

    switch (type) {
      case 0:
        console.log("type 0 road")
        build = new Build({ position: Vector3.create(1, 0, 1), scale: Vector3.create(1, 1, 1)}, type, attraction)

      break
      case 1:
        console.log("type 1")
        build = new Build({ position: Vector3.create(1, 0, 1), scale: Vector3.create(1, 1, 1)}, type, attraction)

      break
      case 2:
        console.log("type 2 ")
        build = new Build({ position: Vector3.create(1, 0, 1), scale: Vector3.create(1, 1, 1)}, type, attraction)
      break
      case 3:
        console.log("type 2 ")
        build = new Build({ position: Vector3.create(1, 0, 1), scale: Vector3.create(1, 1, 1)}, type, attraction)
      break
      case 4:
        console.log("type 2 ")
        build = new Build({ position: Vector3.create(1, 0, 1), scale: Vector3.create(1, 1, 1)}, type, attraction)
      break
      case 5:
        console.log("type 2 ")
        build = new Build({ position: Vector3.create(1, 0, 1), scale: Vector3.create(1, 1, 1)}, type, attraction)
      break
      case 6:
        console.log("type 2 ")
        build = new Build({ position: Vector3.create(1, 0, 1), scale: Vector3.create(1, 1, 1)}, type, attraction)
      break
      case 7:
        console.log("type 2 ")
        build = new Build({ position: Vector3.create(1, 0, 1), scale: Vector3.create(1, 1, 1)}, type, attraction)
      break
      case 8:
        console.log("type 2 ")
        build = new Build({ position: Vector3.create(1, 0, 1), scale: Vector3.create(1, 1, 1)}, type, attraction)
      break
      case 9:
        console.log("type 2 ")
        build = new Build({ position: Vector3.create(1, 0, 1), scale: Vector3.create(1, 1, 1)}, type, attraction)
      break
      case 10:
        console.log("type 2 ")
        build = new Build({ position: Vector3.create(1, 0, 1), scale: Vector3.create(1, 1, 1)}, type, attraction)
      break
      case 11:
        console.log("type 2 ")
        build = new Build({ position: Vector3.create(1, 0, 1), scale: Vector3.create(1, 1, 1)}, type, attraction)
      break
      default:
      break
    }
        
    engine.addSystem(positioningSystem, 1, "positioningSystem")

  }
}


const RAY_INTERVAL = 0.25
const TimerComponent = engine.defineComponent('TimerComponent', {
  t: Schemas.Float,
})
TimerComponent.create(engine.addEntity())

function positioningSystem(dt: number){
  for (const [entity] of engine.getEntitiesWith(TimerComponent)) {
    const timer = TimerComponent.getMutable(entity)
    timer.t += dt
    positioningSystemActive = true
    if (timer.t > RAY_INTERVAL) {

      timer.t = 0
      raycastSystem.registerLocalDirectionRaycast(
        {
          entity: engine.CameraEntity,
          opts: {
            queryType: RaycastQueryType.RQT_HIT_FIRST,
            direction: Vector3.Forward(),
          },
        },
        function (raycastResult) {
          //console.log("Base Hit X")
          //console.log(raycastResult.hits.length)
          //console.log(raycastResult.hits)    
          
          let nothingHit = true
          //entity was hit
          if (raycastResult.hits.length > 0) {
            if (raycastResult.hits[0].entityId) {
    
              //attempt to get hit position and hit entity
              const hitPos = raycastResult.hits[0].position
              if (!hitPos) return
              const hitID = raycastResult.hits[0].entityId
              if (!hitID) return
              const entity = hitID as Entity
    
                //console.log("Interact Click X")
                //console.log(entity)
                //console.log(raycastResult.hits[0].meshName)
                //console.log(raycastResult.hits[0].position?.x)
                //console.log(raycastResult.hits[0].position?.y)
                //console.log(raycastResult.hits[0].position?.z)
                //console.log(res?.hit?.length)
                //console.log(res?.hit?.normalHit)
        
                //SECTOR calculation
                let xcoord = raycastResult.hits[0].position?.x
                let xcoordFloor = 0
                let zcoord = raycastResult.hits[0].position?.z
                let zcoordFloor = 0
        
                //let sectorX = res?.hit?.position
                if(xcoord)
                  {
                    //console.log("Floor X")
                    xcoordFloor = Math.round(xcoord)
                    //xcoordFloor = Math.round(xcoord * 4) / 4
                    //console.log(xcoordFloor)
                  }
        
                if(zcoord)
                  {
                    //console.log("Floor Z")
                    zcoordFloor = Math.round(zcoord)
                    //zcoordFloor = Math.round(zcoord * 4) / 4
                    //console.log(zcoordFloor)
                  }
                  console.log("engine.getEntityState(build.entity)")
                  console.log(engine.getEntityState(build.entity))

                  if(engine.getEntityState(build.entity) == 1)
                  {
                    build.changeLocation({ position: Vector3.create(xcoordFloor, 0.02, zcoordFloor) })
                  }
            }
          }
        }
      )
    }
  }  
}

// MAIN START /////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

export function main() {

  staticUI()
  let allBuilds: Build[] = [];
  let allRoads: Build[] = [];

  connect("my_room").then((room) => {
    console.log("Connected yay!")
    log("Connected!");

    room.onMessage("clientmessage", (messageData) => {
      log("received clientmessage")
      log(messageData)
      showClientMessage(messageData)
    })

    room.onMessage("wincondition", (messageData) => {
      log("received wincondition")
      //log(messageData)
      //showClientMessage(messageData)
    })

    room.onMessage("hideclientmessage", () => {
      log("received hideclientmessage")
      hideClientMessage()
    })

    room.state.players.onAdd = (player: any) => {
      log("room.state.players.onAdd")
      player.onChange = function(changes: any) {
        log("player.onChange")

        changes.forEach((change: any) => {
          //log("player changes.forEach")
          //log(change)

          switch (change.field) {
            case "coins":
              log("change.field === coins")
              log(change.value);
              changeCoinsCount(change.value)
            break
            default:
            break
            }

        })
      }
    } 

    room.state.npccounter.onChange = function(changes: any) {
      log("room.state.npccounter.onChange")
      log(changes)
      changes.forEach((change: any) => {
        switch (change.field) {
          case "count":
            log("change.field === count")
            log(change.value);
            changeNpcCount(change.value)
            break
          default:
            break
        }
      })
    } 



    room.state.builds.onAdd = (build: any) => {
      console.log("state.builds.onAdd !")
    
    if(build.anchor){
      console.log("build anchor")

      //Only with DB save functionality

      let buildJustAdded = false
      let isRoad = false

      allBuilds.forEach(building => {

        //log("allBuilds.forEach");
        //log(build.x);
        //log(building.getLocation().x);
        //log(build.z);
        //log(building.getLocation().z);

       if(build.x == building.getLocation().x && build.z == building.getLocation().z){   
        log("new build added");
          buildJustAdded = true
        }
      })

      allRoads.forEach(building => {
       if(build.x == building.getLocation().x && build.z == building.getLocation().z){   
        log("new road added");
          buildJustAdded = true
        }
      })

      if(buildJustAdded == false){
        log("buildJustAdded is false (OLD build)");
        let buildNewAdd
        switch (build.type) {
          case 0: //ROAD
            console.log("type 0")
            buildNewAdd = new Build({ position: Vector3.create(build.x, build.y, build.z), scale: Vector3.create(1, 1, 1)}, build.type, build.attraction)
            isRoad = true
          break
          case 1:
            console.log("type 1")
            buildNewAdd = new Build({ position: Vector3.create(build.x, build.y, build.z), scale: Vector3.create(1, 1, 1)}, build.type, build.attraction)
          break
          case 2:  
            console.log("type 2")
            buildNewAdd = new Build({ position: Vector3.create(build.x, build.y, build.z), scale: Vector3.create(1, 1, 1)}, build.type, build.attraction)
          break
          default:
          break
        }
        if(buildNewAdd && isRoad){
          allRoads.push(buildNewAdd);
        } else if (buildNewAdd){
          allBuilds.push(buildNewAdd);    
        }
      } else {
        log("build already added in click click InputSystem");
          if(build.type == 2){
          }

      }


      


      build.onChange = function(changes: any) {

        changes.forEach((change: any) => {
          //log("changes.forEach");
          //log("change.field");
          //log(change.field);
          
          //if(change.field === "state"){
          //}
        })

      }
    } else {
      console.log("NOT build anchor")

    }
    }


    let allNpcs: Npc[] = [];
    room.state.npcs.onAdd = (npc: any) => {
      console.log("state.npcs.onAdd !")
      let npcNewAdd = new Npc({position: Vector3.create(0, 0, 16)}, npc.id, npc.asset)

      let path: any[] = [];
      npc.npcroad.forEach((roadpoint: any) => {
        path.push(Vector3.create(roadpoint.x, 0, roadpoint.z)
      )
      })
      utils.paths.startStraightPath(npcNewAdd.entity, path, path.length, true, function () {
        console.log('Path is complete - tweenCompleted')
        console.log(npcNewAdd.id)
        Animator.getClip(npcNewAdd.entity, "run").playing = false
        Animator.getClip(npcNewAdd.entity, "idle").playing = true
        room.send("reachedattraction", npcNewAdd.id);
      },
      function (pointIndex, pointCoords, nextPointCoords) {
        //console.log(`Reached point ${pointIndex}`)
      })
/*
      LerpTransformComponent.create(npcNewAdd.entity, {
        path: npc.npcroad,
        start: Vector3.create(0, 0, 16),
        end: Vector3.create(0, 0, 16),
        fraction: 0,
        speed: 1,
        pathTargetIndex: 1,
        reachedEnd: false,
      })
*/

      allNpcs.push(npcNewAdd)

      npc.onChange = function(changes: any) {
        console.log("npc.onChange")
        console.log(changes)
        changes.forEach((change: any) => {
          //log("changes.forEach");
          //log("change.field");
          //log(change.field);

          if(change.field == "state"){
            switch (change.value) {
              case 0:
                console.log("npc state 0")
                allNpcs.forEach(npceach => {
                  if(npceach.id == npc.id){
                    Animator.getClip(npceach.entity, "idle").playing = false
                    Animator.getClip(npceach.entity, "run").playing = true
                  }
                })
              break
              case 1:
                console.log("npc state 1")
                allNpcs.forEach(npceach => {
                  if(npceach.id == npc.id){
                   // Animator.getClip(npceach.entity, "idle").playing = true
                  }
                })
                //Play attraction NPC animation???
              break
              case 2: 
                console.log("npc state 2")
                let changepath: any[] = [];

                npc.npcroad.forEach((roadpoint: any) => {
                  changepath.push(Vector3.create(roadpoint.x, 0, roadpoint.z))
                })
                allNpcs.forEach(npceach => {
                  if(npceach.id == npc.id){
                    Animator.getClip(npceach.entity, "idle").playing = false
                    Animator.getClip(npceach.entity, "run").playing = true
                    //console.log("found npc state 2")
                    //console.log(npc.npcroad)
                    utils.paths.startStraightPath(npceach.entity, changepath, changepath.length, true, function () {
                      console.log('ChangePath is complete - tweenCompleted')
                      console.log(npceach.id)
                      room.send("reachedattraction", npceach.id);
                    },
                    function (pointIndex, pointCoords, nextPointCoords) {
                      //console.log(`Reached point ${pointIndex}`)
                    })
/*
                    LerpTransformComponent.createOrReplace(npceach.entity, {
                      path: npc.npcroad,
                      start: Vector3.create(npc.endx, 0, npc.endz),
                     // start: Vector3.create(0, 0, 16),
                      end: Vector3.create(npc.endx, 0, npc.endz),
                      fraction: 0,
                      speed: 1,
                      pathTargetIndex: 1,
                      reachedEnd: false,
                    })
*/


                  }
                })

              break
              case 3:
                console.log("npc state 3")
                allNpcs.forEach(npceach => {
                  if(npceach.id == npc.id){
                    //LerpTransformComponent.deleteFrom(npceach.entity)
                    engine.removeEntity(npceach.entity)
                  }
                })

              break
              default:
              break
            }
          }
        })
      }
    }

  // Defining behavior. See `src/systems.ts` file.
  engine.addSystem(circularSystem)
  engine.addSystem(changeColorSystem)

  // draw UI. Here is the logic to spawn cubes.
  //setupUi()

  let base = new Base({position: Vector3.create(16, 0, 16)})
  //let npc1 = new Npc({position: Vector3.create(8, 0, 8)})
  
  // define system
  /*
  function PathMove(dt: number) {
    //forEach - START
    allNpcs.forEach(npc => {
    if(LerpTransformComponent.has(npc.entity)){
    let transform = Transform.getMutable(npc.entity)
    let lerp = LerpTransformComponent.getMutable(npc.entity)
    if(lerp.reachedEnd == false){
    if (lerp.fraction < 1) {
      lerp.fraction += dt * lerp.speed
      transform.position = Vector3.lerp(lerp.start, lerp.end, lerp.fraction)
    } else {


      if (lerp.pathTargetIndex >= lerp.path.length) {
        lerp.reachedEnd = true
        //lerp.pathTargetIndex = lerp.path.length
        //lerp.pathTargetIndex -= 1 //NPCs only goes one way
        //LerpTransformComponent.deleteFrom(npc.entity)
        room.send("reachedattraction", npc.id);
      } else {
        lerp.start = lerp.end
        lerp.end = lerp.path[lerp.pathTargetIndex]
        lerp.fraction = 0
        lerp.pathTargetIndex += 1
      }

    }
    }
  }
  })
    //forEach - END
  }
*/
  //engine.addSystem(PathMove)

  // create entity
  //Transform.create(this.entity, {
  //  position: Vector3.create(1, 1, 1),
  //})
  //MeshRenderer.setBox(this.entity)

  //const point1 = Vector3.create(1, 1, 1)
  //const point2 = Vector3.create(8, 1, 3)
  //const point3 = Vector3.create(8, 1, 7)
  //const point4 = Vector3.create(1, 1, 7)


  //Move to onAdd NPC???


  //RAYS

/*
  engine.addSystem((deltaTime) => {
    const result = raycastSystem.registerRaycast(
      engine.CameraEntity,
      localDirectionOptions({
        collisionMask: ColliderLayer.CL_CUSTOM1 | ColliderLayer.CL_CUSTOM3 | ColliderLayer.CL_POINTER,
        originOffset: Vector3.create(0, 0.4, 0),
        maxDistance: 16,
        queryType: RaycastQueryType.RQT_HIT_FIRST,
        direction: Vector3.Forward(),
        continuous: true // don't overuse the 'continuous' property as raycasting is expensive on performance
      })
    )
    if (result){} // do something
  })
*/  
  // check rays

  //TimerComponent.create(engine.CameraEntity)

  //TEMP OUT
  
  //const myRayEntity = engine.addEntity()
  engine.addSystem(() => {
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)){
      console.log("inputSystem.isTriggered(IA_PRIMARY)")
      //changeTab(isFoodTab)
      setBuildTabVisible()
    }
    if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)){
      console.log("inputSystem.isTriggered(IA_SECONDARY)")
      //changeTab(isFoodTab)
      setInfoUIVisible()
    }
    //pull in feedback from input system
    const cmd = inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)
    //if input was triggered, attmept to fire a shot
    if (cmd) {
      if(builderState && positioningSystemActive){
        console.log("builderState TRUE && positioningSystemActive TRUE")
        builderState = false
        positioningSystemActive = false
        engine.removeSystem("positioningSystem")
        const buildData = [build.getLocation(), build.type, build.attraction]

        switch (build.type) {
          case 0:  //ROAD
          console.log("click on type 0")
          console.log("newly added build is ROAD")

          let connectedToRoad = false
          let connectedToRoadMany = false
          let takenPosition = false
          allRoads.forEach(function (road) {
            console.log("road found")
            let topCheckX = road.getLocation().x-1
            let topCheckY = road.getLocation().z

            let rightCheckX = road.getLocation().x
            let rightCheckY = road.getLocation().z+1

            let bottomCheckX = road.getLocation().x+1
            let bottomCheckY = road.getLocation().z

            let leftCheckX = road.getLocation().x
            let leftCheckY = road.getLocation().z-1

            if(build.getLocation().x == topCheckX && build.getLocation().z == topCheckY){
              console.log("road top connection")
              //REDUNDAT CHECK
              if(connectedToRoad){
                console.log("connectedToRoadMany")
                connectedToRoadMany = true
              }
              connectedToRoad = true
            }

            if(build.getLocation().x == rightCheckX && build.getLocation().z == rightCheckY){
              console.log("road right connection")
              if(connectedToRoad){
                console.log("connectedToRoadMany")
                connectedToRoadMany = true
              }
              connectedToRoad = true
            }

            if(build.getLocation().x == bottomCheckX && build.getLocation().z == bottomCheckY){
              console.log("road bottom connection")
              if(connectedToRoad){
                console.log("connectedToRoadMany")
                connectedToRoadMany = true
              }
              connectedToRoad = true
            }

            if(build.getLocation().x == leftCheckX && build.getLocation().z == leftCheckY){
              console.log("road left connection")
              if(connectedToRoad){
                console.log("connectedToRoadMany")
                connectedToRoadMany = true
              }
              connectedToRoad = true
            }
            //SAME position check
            if(build.getLocation().x == road.getLocation().x && build.getLocation().z == road.getLocation().z){
              console.log("can not build DUPLICATE road")
              takenPosition = true
            }
          })
          console.log("connectedToRoad")
          console.log(connectedToRoad)
          console.log("connectedToRoadMany")
          console.log(connectedToRoadMany)
          console.log("takenPosition")
          console.log(takenPosition)
          //if(connectedToRoad && connectedToRoadMany == false && takenPosition == false){
          if(connectedToRoad && takenPosition == false){
            allRoads.push(build);
            //const buildData = [build.getLocation(), build.type]
            room.send("build", buildData);
          } else {
            console.log("road not connected or too many connections or duplicate")
            engine.removeEntity(build.entity)
          }
          break

          case 1:
            console.log("click on type 1")
            console.log("newly added build is SMALL FAIR ATTRACTION")

            //allBuilds.push(build);    
            //room.send("build", buildData);

            let connectedBuildToRoad = false
            let takenRoadPosition = false
            let takenBuildPosition = false
            allRoads.forEach(function (road) {
              //console.log("road found")
              let topCheckX = road.getLocation().x-1
              let topCheckY = road.getLocation().z
  
              let rightCheckX = road.getLocation().x
              let rightCheckY = road.getLocation().z+1
  
              let bottomCheckX = road.getLocation().x+1
              let bottomCheckY = road.getLocation().z
  
              let leftCheckX = road.getLocation().x
              let leftCheckY = road.getLocation().z-1
  
              if(build.getLocation().x == topCheckX && build.getLocation().z == topCheckY){
                console.log("build top road connection")
                //REDUNDAT CHECK
                connectedBuildToRoad = true
              }
  
              if(build.getLocation().x == rightCheckX && build.getLocation().z == rightCheckY){
                console.log("build right road connection")
                connectedBuildToRoad = true
              }
  
              if(build.getLocation().x == bottomCheckX && build.getLocation().z == bottomCheckY){
                console.log("build bottom road connection")
                connectedBuildToRoad = true
              }
  
              if(build.getLocation().x == leftCheckX && build.getLocation().z == leftCheckY){
                console.log("build left road connection")
                connectedBuildToRoad = true
              }
              //SAME position check
              if(build.getLocation().x == road.getLocation().x && build.getLocation().z == road.getLocation().z){
                console.log("can not build ON ANOTHER road")
                takenRoadPosition = true
              }
            })
            allBuilds.forEach(function (building) {
              //console.log("build found")
              //SAME position check
              if(build.getLocation().x == building.getLocation().x && build.getLocation().z == building.getLocation().z){
                console.log("can not build ON OTHER build")
                takenBuildPosition = true
              }
            })
            console.log("connectedBuildToRoad")
            console.log(connectedBuildToRoad)
            console.log("takenBuildPosition")
            console.log(takenBuildPosition)
            console.log("takenRoadPosition")
            console.log(takenRoadPosition)

            if(connectedBuildToRoad && takenRoadPosition == false && takenBuildPosition == false){
              allBuilds.push(build);
              //const buildData = [build.getLocation(), build.type]
              room.send("build", buildData);
            } else {
              console.log("build not connected to road or DUPLICATE")
              engine.removeEntity(build.entity)
            }
          break



          case 2:
            console.log("click on type 1")
            console.log("newly added build is 2X2 FAIR ATTRACTION")
            let connected2x2BuildToRoad = false
            let taken2x2RoadPosition = false
            let taken2x2BuildPosition = false

            let build1XLoc = build.getLocation().x
            let build1ZLoc = build.getLocation().z
            let build2XLoc = build.getLocation().x
            let build2ZLoc = build.getLocation().z-1
            let build3XLoc = build.getLocation().x-1
            let build3ZLoc = build.getLocation().z
            let build4XLoc = build.getLocation().x-1
            let build4ZLoc = build.getLocation().z-1

            allRoads.forEach(function (road) {
              //console.log("road found")
              let topCheckX = road.getLocation().x-1
              let topCheckY = road.getLocation().z

              let rightCheckX = road.getLocation().x
              let rightCheckY = road.getLocation().z+1

              let bottomCheckX = road.getLocation().x+1
              let bottomCheckY = road.getLocation().z

              let leftCheckX = road.getLocation().x
              let leftCheckY = road.getLocation().z-1

              //1
              if(build1XLoc == topCheckX && build1ZLoc == topCheckY){
                console.log("build 1 top road connection")
                //REDUNDAT CHECK
                connected2x2BuildToRoad = true
              }
              if(build1XLoc == rightCheckX && build1ZLoc == rightCheckY){
                console.log("build 1 right road connection")
                connected2x2BuildToRoad = true
              }
              if(build1XLoc == bottomCheckX && build1ZLoc == bottomCheckY){
                console.log("build 1 bottom road connection")
                connected2x2BuildToRoad = true
              }
              if(build1XLoc == leftCheckX && build1ZLoc == leftCheckY){
                console.log("build 1 left road connection")
                connected2x2BuildToRoad = true
              }

              //2
              if(build2XLoc == topCheckX && build2ZLoc == topCheckY){
                console.log("build 2 top road connection")
                //REDUNDAT CHECK
                connected2x2BuildToRoad = true
              }
              if(build2XLoc == rightCheckX && build2ZLoc == rightCheckY){
                console.log("build 2 right road connection")
                connected2x2BuildToRoad = true
              }
              if(build2XLoc == bottomCheckX && build2ZLoc == bottomCheckY){
                console.log("build 2 bottom road connection")
                connected2x2BuildToRoad = true
              }
              if(build2XLoc == leftCheckX && build2ZLoc == leftCheckY){
                console.log("build 2 left road connection")
                connected2x2BuildToRoad = true
              }

              //3
              if(build3XLoc == topCheckX && build3ZLoc == topCheckY){
                console.log("build 3 top road connection")
                //REDUNDAT CHECK
                connected2x2BuildToRoad = true
              }
              if(build3XLoc == rightCheckX && build3ZLoc == rightCheckY){
                console.log("build3  right road connection")
                connected2x2BuildToRoad = true
              }
              if(build3XLoc == bottomCheckX && build3ZLoc == bottomCheckY){
                console.log("build 3 bottom road connection")
                connected2x2BuildToRoad = true
              }
              if(build3XLoc == leftCheckX && build3ZLoc == leftCheckY){
                console.log("build 3 left road connection")
                connected2x2BuildToRoad = true
              }

              //4
              if(build4XLoc == topCheckX && build4ZLoc == topCheckY){
                console.log("build 4 top road connection")
                //REDUNDAT CHECK
                connected2x2BuildToRoad = true
              }
              if(build4XLoc == rightCheckX && build4ZLoc == rightCheckY){
                console.log("build 4 right road connection")
                connected2x2BuildToRoad = true
              }
              if(build4XLoc == bottomCheckX && build4ZLoc == bottomCheckY){
                console.log("build 4 bottom road connection")
                connected2x2BuildToRoad = true
              }
              if(build4XLoc == leftCheckX && build4ZLoc == leftCheckY){
                console.log("build 4 left road connection")
                connected2x2BuildToRoad = true
              }

              //SAME position check
              //1
              if(build1XLoc == road.getLocation().x && build1ZLoc == road.getLocation().z){
                console.log("can not build 1 ON ANOTHER road")
                taken2x2RoadPosition = true
              }
              //2
              if(build2XLoc == road.getLocation().x && build2ZLoc == road.getLocation().z){
                console.log("can not build 2 ON ANOTHER road")
                taken2x2RoadPosition = true
              }
              //3
              if(build3XLoc == road.getLocation().x && build3ZLoc == road.getLocation().z){
                console.log("can not build 3 ON ANOTHER road")
                taken2x2RoadPosition = true
              }
              //4
              if(build4XLoc == road.getLocation().x && build4ZLoc == road.getLocation().z){
                console.log("can not build 4 ON ANOTHER road")
                taken2x2RoadPosition = true
              }
            })


            allBuilds.forEach(function (building) {
              //SAME position check
              //1
              if(build1XLoc == building.getLocation().x && build1ZLoc == building.getLocation().z){
                console.log("can not build 1 ON OTHER build")
                taken2x2BuildPosition = true
              }
              //2
              if(build2XLoc == building.getLocation().x && build2ZLoc == building.getLocation().z){
                console.log("can not build 2 ON OTHER build")
                taken2x2BuildPosition = true
              }
              //3
              if(build3XLoc == building.getLocation().x && build3ZLoc == building.getLocation().z){
                console.log("can not build 3 ON OTHER build")
                taken2x2BuildPosition = true
              }
              //4
              if(build4XLoc == building.getLocation().x && build4ZLoc == building.getLocation().z){
                console.log("can not build 4 ON OTHER build")
                taken2x2BuildPosition = true
              }
            })
            console.log("connected2x2BuildToRoad")
            console.log(connected2x2BuildToRoad)
            console.log("taken2x2BuildPosition")
            console.log(taken2x2BuildPosition)
            console.log("taken2x2RoadPosition")
            console.log(taken2x2RoadPosition)

            if(connected2x2BuildToRoad && taken2x2RoadPosition == false && taken2x2BuildPosition == false){
              allBuilds.push(build);
              room.send("build", buildData);
            } else {
              console.log("build not connected to road or DUPLICATE")
              engine.removeEntity(build.entity)
            }          
          break




          default:
          break
        }
      } else {
        console.log("builderState or positioningSystemActive FALSE")
      }
    }
  })

  /*
  engine.addSystem((dt) => {
    for (const [entity] of engine.getEntitiesWith(TimerComponent)) {
      const timer = TimerComponent.getMutable(entity)
      timer.t += dt
  
      if (timer.t > RAY_INTERVAL) {
        timer.t = 0
        raycastSystem.registerLocalDirectionRaycast(
          {
            entity: engine.CameraEntity,
            opts: {
              queryType: RaycastQueryType.RQT_HIT_FIRST,
              direction: Vector3.Forward(),
            },
          },
          function (raycastResult) {
            console.log("Base Hit X")
            console.log(raycastResult.hits.length)
            console.log(raycastResult.hits)    
            
            let nothingHit = true
            //entity was hit
            if (raycastResult.hits.length > 0) {
              if (raycastResult.hits[0].entityId) {
      
                //attempt to get hit position and hit entity
                const hitPos = raycastResult.hits[0].position
                if (!hitPos) return
                const hitID = raycastResult.hits[0].entityId
                if (!hitID) return
                const entity = hitID as Entity
      
                  console.log("Interact Click X")
                  console.log(entity)
                  console.log(raycastResult.hits[0].meshName)
                  //console.log(raycastResult.hits[0].position?.x)
                  //console.log(raycastResult.hits[0].position?.y)
                  //console.log(raycastResult.hits[0].position?.z)
                  //console.log(res?.hit?.length)
                  //console.log(res?.hit?.normalHit)
          
                  //SECTOR calculation
                  let xcoord = raycastResult.hits[0].position?.x
                  let xcoordFloor = 0
                  let zcoord = raycastResult.hits[0].position?.z
                  let zcoordFloor = 0
          
                  //let sectorX = res?.hit?.position
                  if(xcoord)
                    {
                      //console.log("Floor X")
                      xcoordFloor = Math.round(xcoord)
                      //console.log(xcoordFloor)
          
                    }
          
                  if(zcoord)
                    {
                      //console.log("Floor Z")
                      zcoordFloor = Math.round(zcoord)
                      //console.log(zcoordFloor)
          
                    }
          
                  //const grid = new Grid({ position: Vector3.create(xcoordFloor, 0.02, zcoordFloor), scale: Vector3.create(1, 1, 1)})
                  
                  build.changeLocation({ position: Vector3.create(xcoordFloor, 0.02, zcoordFloor) })


              }
      
            }
          }
      
          
        )
      }
    }
  })
  */
  //TEMP OUT END


  /*
  engine.addSystem(() => {
    //pull in feedback from input system
    const cmd = inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)
    //if input was triggered, attmept to fire a shot
    if (cmd) {
      FireShot()
    }
  })
  */

/*
  //DUMMY
  const dummyShape:PBGltfContainer =  {
    src:"models/tempEvliWarrior.glb",
    invisibleMeshesCollisionMask: undefined,
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
  }

  let dummy = engine.addEntity()
  GltfContainer.create(dummy,dummyShape)
  Transform.create(dummy,{position: Vector3.create(8, 0, 8)})
  //DUMMY END
  */

}).catch((err) => {
  //error(err);
  console.error(err)

});
}
/*
const isDebugging: boolean = true
var inShootingArea: boolean = true

export function FireShot() {
  //ensure player is within firing zone
  if (!inShootingArea) return

  //draw a new raycast from the camera's position
  raycastSystem.registerLocalDirectionRaycast(
    {
      entity: engine.CameraEntity,
      opts: {
        queryType: RaycastQueryType.RQT_HIT_FIRST,
        direction: Vector3.Forward(), //Transform.get(engine.CameraEntity).rotation
        maxDistance: 30
      }
    },
    function (raycastResult) {
      if (isDebugging) console.log('Shooting Area: raycastResult')
      if (isDebugging) console.log(raycastResult)
      let nothingHit = true
      //entity was hit
      if (raycastResult.hits.length > 0) {
        if (raycastResult.hits[0].entityId) {

          if (isDebugging) console.log('Shooting Area: valid hit found, attempting to find entity...')
          //attempt to get hit position and hit entity
          const hitPos = raycastResult.hits[0].position
          if (!hitPos) return
          const hitID = raycastResult.hits[0].entityId
          if (!hitID) return
          const entity = hitID as Entity

            console.log("Interact Click X")
            console.log(entity)
            console.log(raycastResult.hits[0].meshName)
            console.log(raycastResult.hits[0].position?.x)
            console.log(raycastResult.hits[0].position?.y)
            console.log(raycastResult.hits[0].position?.z)
            //console.log(res?.hit?.length)
            //console.log(res?.hit?.normalHit)
    
            //SECTOR calculation
            let xcoord = raycastResult.hits[0].position?.x
            let xcoordFloor
            let zcoord = raycastResult.hits[0].position?.z
            let zcoordFloor
    
            //let sectorX = res?.hit?.position
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
      }
      //no entity hit
      else {

      }
    }

  }
  )
}
*/