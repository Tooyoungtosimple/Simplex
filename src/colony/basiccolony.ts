import {CreepBuilder} from "../creeps/creepbuilder";
import {StructureBuilder} from "../structures/structurebuilder";
import {Queen} from "../creeps/queen";
import {LocalSpawn} from "../structures/structurespawn";


class BasicColony implements I_Colony{

    
    type: ColonyType;
    name: string;
    creeps: I_Creeps[];
    structures: I_Structures[];


    constructor(data: I_Colony) {
        if(data.name) {
            this.name = data.name;
        } else {
            throw new Error("initial basic colony with name of undefined!\n");
        }


        if(data.type) {
            this.type = data.type;
        } else {
            this.type = ColonyType.BASIC_COLONY;
        }
        
        
        this.creeps = new Array<I_Creeps>();
        if(data.creeps){
            for (const iterator of data.creeps) {
                let obj: any = new CreepBuilder().withInf(iterator).build();
                if(obj) this.creeps.push(obj);
            }
        }


        this.structures = new Array<I_Structures>();
        if(data.structures){
            for (const iterator of data.structures) {
                let obj: any = new StructureBuilder().withInf(iterator).build()
                if(obj) this.structures.push(obj);
            }
        }
    }

    structureGarbage(id: string): void {
        this.structures = this.structures.filter(item => item.id !== id);
    }

    creepGarbage(name: string): void {
        this.creeps = this.creeps.filter(item => item.name !== name);
    }


    getName(): string {
        return this.name;
    }

    run(): void {
        if(this.creeps)
            for (const iterator of this.creeps) {
                iterator.run(this);
            }


        if(this.structures)
            for (const iterator of this.structures) {
                iterator.run(this);
            }   
        
        if(Queen.getCount() < 5) {
            Queen.newGeneration([WORK,CARRY,MOVE]);
            LocalSpawn.spawnPush({body: [WORK,CARRY,MOVE],
                name: "queen0"});
        }
        
    }
    
}

export {BasicColony};