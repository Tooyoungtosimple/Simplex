import {mount} from "./console";
import { Simplex } from "simplex";
import {saveMemory} from "./memory";
import { LocalSpawn } from "./structures/structurespawn";

module.exports.loop = function(): void{
    mount();
    var obj: any = new LocalSpawn({});
    
    if(!global.needInit) {
        global.needInit = true;

        var buider: any = JSON.parse(Memory.Simplex);
        global.simplex = new Simplex(buider);
    }

    global.simplex.run();
    saveMemory(global.simplex);
}