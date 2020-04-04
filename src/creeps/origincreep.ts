import {LocalSpawn} from "../structures/structurespawn";


class OriginCreep implements I_Creeps {
    name: string;
    colony: string;


    constructor(name: string, colony: string) {
        this.name = name;
        this.colony = colony;
        if(this.name in Game.creeps) {
            Game.creeps[this.name].memory.colony = this.colony;
        } else {
            this.nextGeneration();
        }
    }

    private nextGeneration() {
        let deal: I_SpawnCreep = {
            body: [],
            name: ""
        };
        let creep = Game.creeps[this.name];
        if(creep) {
            deal.body = creep.body.map((element) => {return element.type;});
            deal.name = Game.time.toString();
            LocalSpawn.spawnPush(deal);
        }
    }

    run(): void {
        throw new Error("Method not implemented.");
    }

}

export {OriginCreep};