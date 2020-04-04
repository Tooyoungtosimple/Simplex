import { Simplex } from "simplex";

function saveMemory(data: I_Simplex): void {
    Memory.Simplex = JSON.stringify(data);
}


export {saveMemory};