//
// IMPORTANT :
// - trying vanilla without refernce imports and see if it works
//

import { Color4 } from "@dcl/sdk/math";
import { Client, Room } from "colyseus.js";
import { log } from "./back-ports/backPorts";
import { getUserData } from "~system/UserIdentity"
import { getRealm } from "~system/Runtime"
//import { isPreviewMode, getCurrentRealm } from '@decentraland/EnvironmentAPI'
//import { getUserData } from "@decentraland/Identity";



export async function connect(roomName: string, options: any = {}) {

    const realm = await getRealm({

    });
    //const isPreview = realm.realmInfo?.isPreview

    //
    // make sure users are matched together by the same "realm".
    //
    options.realm = realm?.realmInfo?.realmName;
    let userData = await getUserData({});
    options.userData = userData.data

    log("userData:", options.userData);

    const address = options.userData.userId
    options.address = address

    //const ENDPOINT = "ws://127.0.0.1:2567";
    const ENDPOINT = "wss://fairgroundserver.onrender.com"

    const client = new Client(ENDPOINT);
    let room

    try {
        //
        // Docs: https://docs.colyseus.io/client/client/#joinorcreate-roomname-string-options-any
        //
        room = await client.joinOrCreate<any>(roomName, options);
        //if (isPreview) { updateConnectionDebugger(room); }

        return room;

    } catch (e) {
        console.error(e)
        //updateConnectionMessage(`Error: ${e.message}`, Color4.Red())
        throw e;
    }
}

//let message: UIText;

function addConnectionDebugger(endpoint: string) {
    updateConnectionMessage(`Connecting to ${endpoint}`, Color4.White());
}

function updateConnectionMessage(value: string, color: Color4) {
    console.log("updateConnectionMessage",value)

}

function updateConnectionDebugger(room: Room) {
    updateConnectionMessage("Connected.", Color4.Green());
    room.onLeave(() => updateConnectionMessage("Connection lost", Color4.Red()));
}