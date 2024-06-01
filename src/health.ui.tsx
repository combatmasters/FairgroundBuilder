import { TextureFilterMode } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Dropdown, Label, ReactEcsRenderer, UiEntity} from '@dcl/sdk/react-ecs'
import * as ui from 'dcl-ui-toolkit'
import { Room } from 'colyseus.js'
import * as utils from '@dcl-sdk/utils'

import { VideoTracksActiveStreamsData } from '~system/CommsApi'
import { engine } from '@dcl/sdk/ecs'
import { enterBuilderMode } from '.'
import { _openExternalURL } from './back-ports/backPorts'

let energyPercentage: number = 10
let healthPercentage: number = 10



let inv1Count = '0'
let inv2Count = '0'

let baseFrame = 'images/baseframe.png'
let selectedFrame = 'images/selected.png'

let invFrameSwitch = 'images/baseframeSwitch.png'
let inv1Frame = selectedFrame
let inv2Frame = baseFrame


let roomVar: Room

let visibleInfoTab: boolean = false
let visibleBuildTab: boolean = false
let visibleClientMessage: boolean = false
let visibleClientMessageDescription: boolean = false
let clientTitleMessage: string = "Hello Visitor"
let clientMessage: string = "Hello Visitor from Local"





export function setBuildTabVisible():void{
  console.log("setBuildTabVisible interact")
  //roomVar = room
  if(visibleBuildTab){
    visibleBuildTab = false
  } else {
    visibleBuildTab = true
  }
}

export function setInfoUIVisible():void{
  console.log("setInfoUIVisible interact")
  //roomVar = room
  if(visibleInfoTab){
    visibleInfoTab = false
  } else {
    visibleInfoTab = true
  }
}



export function changeCoinsCount(value: number):void{
  inv1Count = value.toString()
}

export function changeNpcCount(value: number):void{
  inv2Count = value.toString()
}

export function showClientMessage(this: any, value: any[]):void{
  console.log("showClientMessage")
  clientTitleMessage = value[0]
  clientMessage = value[1]
  if(clientMessage == ""){
    visibleClientMessageDescription = false
  } else {
    visibleClientMessageDescription = true
  }
  visibleClientMessage = true
  }

export function hideClientMessage():void{
  visibleClientMessage = false
}

const uiComponent2 = () => (

<UiEntity
      uiTransform={{
        width: '100%',
        height: '8%',

        alignSelf: 'flex-start',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
      }}
    >



<UiEntity
    // CLIENT ////////////////////////////////////////////////////
        uiTransform={{
            display: visibleClientMessage ? 'flex':'none',
            width: '26%',
            height: '100%',
            //justifyContent: 'center',
            //flexWrap: 'wrap'
            //flexDirection: 'column',
            alignItems: 'flex-start',
            flexDirection: 'column',
            positionType: 'absolute'  ,
            position: { top: '100%', right: '37%' } ,


          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: {
              src: 'images/button.png'
            },
          }}
          //uiText={{ value: 'E', fontSize: 28, color: Color4.White() }}
        >
        <UiEntity
              uiTransform={{
                width: `100%`,
                height: '100%',
                margin: { top:'5px', bottom:'5px' },
                alignSelf: 'center',
                //alignSelf: 'flex-start',
                //flexWrap: 'wrap'
                //flexDirection: 'column'
              }}
        >
              <UiEntity 
                  onMouseDown={()=> {console.log('Currency Image clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Label
                    onMouseDown={() => {console.log('Health Label clicked!')}}
                    value={clientTitleMessage}
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Green()}
                    uiTransform={{ 
                      width: '100%', 
                      height: visibleClientMessageDescription ? '50%':'100%',
                      alignSelf:'center',
                    } }
                  />
                  <Label
                    onMouseDown={() => {
                      console.log('PINEAPPLE_SEED Label clicked!')
                    }}
                    value={clientMessage}
                    font='sans-serif'
                    fontSize={14}
                    color={Color4.Green()}
                    uiTransform={{ 
                      width: '100%',
                      height: visibleClientMessageDescription ? '50%':'0%',
                      alignSelf:'flex-end',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
              </UiEntity> 
 
        </UiEntity>
      </UiEntity>




    <UiEntity
    // BOTTOM UI TEST ////////////////////////////////////////////////////
      uiTransform={{
        display: 'flex',
        positionType: 'absolute'  ,
        width: '26%',
        height: '100%',
        position: { top: '1150%', right: '37%' } ,
        flexDirection:'row',
        flexWrap:'wrap',
        alignSelf:'center'
      }}
    >
        <UiEntity //parent / modal decoration
            uiTransform={{
              width: '33%',
              height: '100%',
              display: 'flex',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
            uiBackground={{texture: {
              src: `${invFrameSwitch}`
            }, 
            textureMode: 'stretch' }}
        >
            <UiEntity 
                  onMouseDown={()=> {console.log('Parrent clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Label
                    onMouseDown={() => {console.log('Equip Label clicked!')}}
                    value=''
                    font='sans-serif'
                    fontSize={14}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '50%', 
                      height: '50%', 
                      alignSelf:'flex-end',
                    } }
                  />
                  <Label
                    onMouseDown={() => {console.log('Food Label clicked!')}}
                    value=''
                    font='sans-serif'
                    fontSize={14}
                    color={Color4.Green()}
                    uiTransform={{ 
                      width: '50%', 
                      height: '50%', 
                      alignSelf:'flex-end',
                    } }
                  />
                </UiEntity> 
        </UiEntity>

        <UiEntity //parent / modal decoration
            uiTransform={{
              width: '33%',
              height: '100%',
              display: 'flex',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
            uiBackground={{texture: {
              src: `${inv1Frame}`
            }, 
            textureMode: 'stretch' }}
        >
            <UiEntity 
                  onMouseDown={()=> {console.log('Currency Image clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Label
                    onMouseDown={() => {console.log('Health Label clicked!')}}
                    value={inv1Count}
                    font='sans-serif'
                    fontSize={24}
                    uiTransform={{ 
                      width: '100%', 
                      height: '100%', 
                      alignSelf:'center',
                      display: 'flex',
                    } }
                  />
                </UiEntity> 
        </UiEntity>

        <UiEntity //parent / modal decoration
            uiTransform={{
              width: '33%',
              height: '100%',
              display: 'flex',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
            uiBackground={{texture: {
              src: `${inv2Frame}`
            }, 
            textureMode: 'stretch' }}
        >
            <UiEntity 
                  onMouseDown={()=> {}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Label
                    onMouseDown={() => {}}
                    value={inv2Count}
                    font='sans-serif'
                    fontSize={24}
                    uiTransform={{ 
                      width: '100%', 
                      height: '100%', 
                      alignSelf:'center',
                      display: 'flex',
                    } }
                  />
                </UiEntity> 
        </UiEntity>
    </UiEntity>




    <UiEntity
    // PLANTING UI  ////////////////////////////////////////////////////
      uiTransform={{
        display: visibleInfoTab ? 'flex':'none',
        positionType: 'absolute'  ,
        width: '26%',
        height: '500%',
        position: { top: '400%', right: '37%' } ,
        flexDirection:'row',
        flexWrap:'wrap',
        alignSelf:'center'
      }}
      uiBackground={{texture: {src: "images/infobg.png"}, textureMode: 'stretch' }}
    >
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '10%',
            justifyContent:'flex-end',
          }}
        >
          <UiEntity 
              onMouseDown={()=> {
                visibleInfoTab = false
              }}
              uiTransform={{
                width: '10%',
                height: '100%',
                display: 'flex',
                flexDirection:'column',
              }}
              uiBackground={{texture: {
                src: 'images/close-icon2.png'
              }, 
              textureMode: 'stretch' }}
          >
          </UiEntity> 
        </UiEntity> 

        <UiEntity //start table
            uiTransform={{
              width: '90%',
              height: '90%',
              //position: { top: 25 } ,
              display: 'flex',
              flexWrap:'wrap',
              alignContent: "flex-start",
              alignSelf:'flex-start',
              justifyContent:'flex-start',
              margin: { left:'5%' },
            }}
          >


          </UiEntity>

    </UiEntity>




    <UiEntity
    // FOOD MARKET UI  ////////////////////////////////////////////////////
      uiTransform={{
        display: visibleBuildTab ? 'flex':'none',
        positionType: 'absolute'  ,
        width: '26%',
        height: '500%',
        position: { top: '400%', right: '37%' } ,
        flexDirection:'row',
        flexWrap:'wrap',
        alignSelf:'center'
      }}
      uiBackground={{texture: {src: "images/marketbg.png"}, textureMode: 'stretch' }}
    >
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '10%',
            flexDirection:'column',
            //justifyContent:'flex-end',
          }}
        >
          <Label
            value='BUILD'
            font='sans-serif'
            fontSize={18}
            color={Color4.Green()}
            uiTransform={{ 
              width: '50%', 
              height: '0%', 
              alignSelf:'center',
              position: { top: '20%'} ,

            } }
          />            
          <UiEntity 
              onMouseDown={()=> {
                console.log('Planting Close Tab Clicked')
                visibleBuildTab = false
              }}
              uiTransform={{
                width: '10%',
                height: '100%',
                display: 'flex',
                //flexDirection:'column',
                alignSelf:'flex-end',
              }}
              uiBackground={{texture: {
                src: 'images/close-icon2.png'
              }, 
              textureMode: 'stretch' }}
          >
          </UiEntity> 
        </UiEntity> 

        <UiEntity //start table
            uiTransform={{
              width: '90%',
              height: '90%',
              //position: { top: 25 } ,
              display: 'flex',
              flexWrap:'wrap',
              alignContent: "flex-start",
              alignSelf:'flex-start',
              justifyContent:'flex-start',
              margin: { left:'5%' },
            }}
          >

        
        <UiEntity //parent / modal decoration
            uiTransform={{
              width: '25%',
              height: '33%',
              display: 'flex',//visibleInvRadishSeed ? 'flex':'none',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
        >
            <UiEntity 
                  onMouseDown={()=> {console.log('Parrent clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Label
                    onMouseDown={() => {console.log('Equip Label clicked!')}}
                    value="0"//{radishSeedCount}
                    font='sans-serif'
                    fontSize={20}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '60%', 
                      height: '60%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/shaperoad.png'
                    }, 
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      console.log('ROAD Buy Label clicked!')
                      //roomVar.send("marketbuy", 'radishSeed');
                      enterBuilderMode(0, 0)
                      visibleBuildTab = false
                    }}
                    value='BUY'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Green()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                    }}
                    value='SELL'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                </UiEntity> 
        </UiEntity>

        <UiEntity //parent / modal decoration
            uiTransform={{
              width: '25%',
              height: '33%',
              display: 'flex',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
        >
            <UiEntity 
                  onMouseDown={()=> {console.log('Parrent clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Label
                    onMouseDown={() => {console.log('Equip Label clicked!')}}
                    value="0"//{radishCount}
                    font='sans-serif'
                    fontSize={20}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '60%', 
                      height: '60%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/shape1.png'
                    }, 
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      console.log('Target Galery Buy Label clicked!')
                      //roomVar.send("marketbuy", 'radish');
                      enterBuilderMode(1, 1)
                      visibleBuildTab = false

                    }}
                    value='BUY'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Green()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      roomVar.send("marketsell", 1);
                    }}
                    value='SELL'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                </UiEntity> 
        </UiEntity>

        <UiEntity //parent / modal decoration
            uiTransform={{
              width: '25%',
              height: '33%',
              display: 'flex',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
        >
            <UiEntity 
                  onMouseDown={()=> {console.log('Currency Image clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  /*
                  uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                      src: isFoodTab ? `${inv1}`: uiAttack
                    },
                  }}
                  */
                >
                  <Label
                    onMouseDown={() => {console.log('Health Label clicked!')}}
                    value="0"//{carootSeedCount}
                    font='sans-serif'
                    fontSize={20}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '60%', 
                      height: '60%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/shape2.png'
                    }, 
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      console.log('Souvenir Shop Buy Label clicked!')
                      //roomVar.send("marketbuy", 'carrotSeed');
                      enterBuilderMode(1, 2)
                      visibleBuildTab = false
                    }}
                    value='BUY'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Green()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      roomVar.send("marketsell", 2);
                    }}
                    value='SELL'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                </UiEntity> 
        </UiEntity>

        <UiEntity //parent / modal decoration
            uiTransform={{
              width: '25%',
              height: '33%',
              display: 'flex',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
        >
            <UiEntity 
                  onMouseDown={()=> {console.log('Currency Image clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  /*
                  uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                      src: isFoodTab ? `${inv1}`: uiAttack
                    },
                  }}
                  */
                >
                  <Label
                    onMouseDown={() => {console.log('Health Label clicked!')}}
                    value="0"//{carrotCount}
                    font='sans-serif'
                    fontSize={20}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '60%', 
                      height: '60%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/shape3.png'
                    }, 
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      console.log('Arcade Buy Label clicked!')
                      enterBuilderMode(1,3)
                      visibleBuildTab = false
                    }}
                    value='BUY'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Green()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      roomVar.send("marketsell", 3);
                    }}
                    value='SELL'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                </UiEntity> 
        </UiEntity>

        <UiEntity //parent / modal decoration
            uiTransform={{
              width: '25%',
              height: '33%',
              display: 'flex',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
        >
            <UiEntity 
                  onMouseDown={()=> {console.log('Currency Image clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  /*
                  uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                      src: isFoodTab ? `${inv2}`: uiBlock
                    },
                  }}
                  */
                >
                  <Label
                    onMouseDown={() => {console.log('Health Label clicked!')}}
                    value="0"//{watermelonSeedCount}
                    font='sans-serif'
                    fontSize={20}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '60%', 
                      height: '60%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/shape4.png'
                    }, 
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      console.log('Hotdog Label clicked!')
                      enterBuilderMode(1, 4)
                      visibleBuildTab = false
                    }}
                    value='BUY'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Green()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      roomVar.send("marketsell", 4);
                    }}
                    value='SELL'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                </UiEntity> 
        </UiEntity>

        <UiEntity //parent / modal decoration
            uiTransform={{
              width: '25%',
              height: '33%',
              display: 'flex',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
        >
            <UiEntity 
                  onMouseDown={()=> {console.log('Currency Image clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  /*
                  uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                      src: isFoodTab ? `${inv2}`: uiBlock
                    },
                  }}
                  */
                >
                  <Label
                    onMouseDown={() => {console.log('Health Label clicked!')}}
                    value="0"//{watermelonCount}
                    font='sans-serif'
                    fontSize={20}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '60%', 
                      height: '60%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/shape5.png'
                    }, 
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      console.log('Candy Shop Label clicked!')
                      enterBuilderMode(1, 5)
                      visibleBuildTab = false
                    }}
                    value='BUY'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Green()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      roomVar.send("marketsell", 5);
                    }}
                    value='SELL'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                </UiEntity> 
        </UiEntity>




        <UiEntity //parent / modal decoration
            uiTransform={{
              width: '25%',
              height: '33%',
              display: 'flex',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
        >
            <UiEntity 
                  onMouseDown={()=> {console.log('Currency Image clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  /*
                  uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                      src: isFoodTab ? `${inv3}`: uiMagic
                    },
                  }}
                  */
                >
                  <Label
                    onMouseDown={() => {console.log('Health Label clicked!')}}
                    value="0"//{pineappleSeedCount}
                    font='sans-serif'
                    fontSize={20}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '60%', 
                      height: '60%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/shape6.png'
                    }, 
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      console.log('Karousel 1 Label clicked!')
                      enterBuilderMode(2, 6)
                      visibleBuildTab = false
                    }}
                    value='BUY'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Green()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      roomVar.send("marketsell", 6);
                    }}
                    value='SELL'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
              </UiEntity> 
          </UiEntity>

          <UiEntity //parent / modal decoration
            uiTransform={{
              width: '25%',
              height: '33%',
              display: 'flex',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
        >
            <UiEntity 
                  onMouseDown={()=> {console.log('Currency Image clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  /*
                  uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                      src: isFoodTab ? `${inv3}`: uiMagic
                    },
                  }}
                  */
                >
                  <Label
                    onMouseDown={() => {console.log('Health Label clicked!')}}
                    value="0"//{pineappleCount}
                    font='sans-serif'
                    fontSize={20}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '60%', 
                      height: '60%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/shape7.png'
                    }, 
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      console.log('Karousel 2 Label clicked!')
                      enterBuilderMode(2, 7)
                      visibleBuildTab = false
                    }}
                    value='BUY'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Green()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      roomVar.send("marketsell", 7);
                    }}
                    value='SELL'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
              </UiEntity> 
          </UiEntity>

          <UiEntity //parent / modal decoration
            uiTransform={{
              width: '25%',
              height: '33%',
              display: 'flex',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
          >
            <UiEntity 
                  onMouseDown={()=> {console.log('Currency Image clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  /*
                  uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                      src: isFoodTab ? `${inv4}`: uiArchery
                    },
                  }}
                  */
                >
                  <Label
                    onMouseDown={() => {console.log('Health Label clicked!')}}
                    value="0"//{cornCount}
                    font='sans-serif'
                    fontSize={20}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '60%', 
                      height: '60%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/shape8.png'
                    }, 
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      console.log('Karousel 3 Label clicked!')
                      enterBuilderMode(2, 8)
                      visibleBuildTab = false
                    }}
                    value='BUY'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Green()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      roomVar.send("marketsell", 8);
                    }}
                    value='SELL'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
            </UiEntity> 
          </UiEntity>

          <UiEntity //parent / modal decoration
            uiTransform={{
              width: '25%',
              height: '33%',
              display: 'flex',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
          >
            <UiEntity 
                  onMouseDown={()=> {console.log('Currency Image clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  /*
                  uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                      src: isFoodTab ? `${inv4}`: uiArchery
                    },
                  }}
                  */
                >
                  <Label
                    onMouseDown={() => {console.log('Health Label clicked!')}}
                    value="0"//{greyFishCount}
                    font='sans-serif'
                    fontSize={20}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '60%', 
                      height: '60%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/shape9.png'
                    }, 
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      console.log('Karousel 4 Cars Label clicked!')
                      enterBuilderMode(2, 9)
                      visibleBuildTab = false
                    }}
                    value='BUY'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Gray()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      roomVar.send("marketsell", 9);
                    }}
                    value='SELL'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
            </UiEntity> 
          </UiEntity>

          <UiEntity //parent / modal decoration
            uiTransform={{
              width: '25%',
              height: '33%',
              display: 'flex',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
          >
            <UiEntity 
                  onMouseDown={()=> {console.log('Currency Image clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  /*
                  uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                      src: isFoodTab ? `${inv4}`: uiArchery
                    },
                  }}
                  */
                >
                  <Label
                    onMouseDown={() => {console.log('Health Label clicked!')}}
                    value="0"//{goldFishCount}
                    font='sans-serif'
                    fontSize={20}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '60%', 
                      height: '60%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/shape10.png'
                    }, 
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      console.log('Karousel 5 Wheel Label clicked!')
                      enterBuilderMode(2, 10)
                      visibleBuildTab = false
                    }}
                    value='BUY'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Gray()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      roomVar.send("marketsell", 10);
                    }}
                    value='SELL'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
            </UiEntity>
          </UiEntity>

          <UiEntity //parent / modal decoration
            uiTransform={{
              width: '25%',
              height: '33%',
              display: 'flex',
              //position: { left: '50%' } ,
              flexDirection:'column',
              //flexWrap:'wrap',
              //alignSelf:'center'
            }}
          >
            <UiEntity 
                  onMouseDown={()=> {console.log('Currency Image clicked!')}}
                  uiTransform={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  /*
                  uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                      src: isFoodTab ? `${inv4}`: uiArchery
                    },
                  }}
                  */
                >
                  <Label
                    onMouseDown={() => {console.log('Health Label clicked!')}}
                    value="0"//{goldFishCount}
                    font='sans-serif'
                    fontSize={20}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '60%', 
                      height: '60%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/shape11.png'
                    }, 
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      console.log('Karousel 6 Baloon Label clicked!')
                      enterBuilderMode(2, 11)
                      visibleBuildTab = false
                    }}
                    value='BUY'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Gray()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
                  <Label
                    onMouseDown={() => {
                      roomVar.send("marketsell", 11);
                    }}
                    value='SELL'
                    font='sans-serif'
                    fontSize={18}
                    color={Color4.Yellow()}
                    uiTransform={{ 
                      width: '80%', 
                      height: '20%', 
                      alignSelf:'center',
                    } }
                    uiBackground={{texture: {
                      src: 'images/button.png'
                    },
                    textureMode: 'stretch' }}
                  />
            </UiEntity>
          </UiEntity>









          </UiEntity>

      </UiEntity>
    </UiEntity>
  )



const uiComponent = () => [ui.render(), uiComponent2()]

export function staticUI(val?:boolean):void{
  console.log("staticUI")
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

function fn(): void {
  throw new Error('Function not implemented.')
}

