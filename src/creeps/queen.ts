import {LocalSpawn} from "../structures/structurespawn";
import {OriginCreep} from "./origincreep";

class Queen extends OriginCreep {
    private static count: number = 0;

    constructor(inf: any) {
        super(inf.name, inf.colonys)
        Queen.count++;
    }
    /**
     * run
     */
    public run() {
        super.run();
        var creep = Game.creeps[this.name];
        var room = Game.rooms[this.colony];
        
        if(creep) {
            if(!room) room = creep.room;

            switch(creep.memory.state) {
                case CreepState.HAVEST:

                    if(creep.store.getFreeCapacity() <= 0) {
                        creep.memory.state = CreepState.TRANSFER;
                        break;
                    }

                    const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                    if(source) {
                        const ret = creep.harvest(source);
                        switch(ret) {
                            case ERR_NOT_IN_RANGE:
                                creep.moveTo(source);
                                break;
                            default:
                                break;
                        }
                    }
                    break;

                case CreepState.TRANSFER:

                    if(creep.store[RESOURCE_ENERGY] <= 0) {
                        creep.memory.state = CreepState.HAVEST;
                        break;
                    }

                    const target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter : function(structure) {
                            return (
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                        },
                        algorithm : "astar" 
                    });
                    if(target) {
                        const ret = creep.transfer(target, RESOURCE_ENERGY);
                        switch(ret) {
                            case ERR_NOT_IN_RANGE:
                                creep.moveTo(target);
                                break;
                            default:
                                break;
                        }
                    }
                    break;
            }
        } else {
            let index = global.simplex.hasColony(this.colony);
            if(index) {
                global.simplex.colonys[index].creepGarbage(this.name);
            }
            throw new Error(this.name+" doesn't exist.\n");
        }
    }

    /**
     * getCount
     */
    public static getCount(): number {
        return Queen.count;
    }

    public static newGeneration(body: BodyPartConstant[], _opt?: any) {
        let deal: I_SpawnCreep = {
            body: body,
            name: Game.time.toString(),
            opt: _opt
        };
        LocalSpawn.spawnPush(deal);
        Queen.count++;
    }
}

export {Queen};