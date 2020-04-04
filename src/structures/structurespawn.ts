

class LocalSpawn extends OriginStructure {
    private static spawnQue: Array<I_SpawnCreep> = new Array<I_SpawnCreep>();
    
    constructor(inf: any){
        if(inf.id) {
            super(inf.id);
        }
    }

    run(colonyHandle: I_Colony): void {
        super.run(colonyHandle);
        this.garbageDetect(colonyHandle);


        const spawn: StructureSpawn = Game.getObjectById(this.id) as StructureSpawn;
        if(!spawn.spawning && this.getBodyCost(LocalSpawn.spawnQue[0].body) < spawn.energy) {
            this.spawnShift(spawn);
        }
    }

    private spawnShift(spawn: StructureSpawn){
        var deal = LocalSpawn.spawnQue.shift();
        if(deal)
            spawn.spawnCreep(deal.body, deal.name, deal?.opt)
    }

    public static spawnPush(deal: I_SpawnCreep): void {
        LocalSpawn.spawnQue.push(deal);
    }

    private garbageDetect(colonyHandle: I_Colony): void {
        const obj: Structure = Game.getObjectById(this.id) as Structure;
        if(obj && obj.structureType && obj.structureType == STRUCTURE_SPAWN) {
            return ;
        } else {
            colonyHandle.structureGarbage(this.id);
        }
    }

    private getBodyCost(body: BodyPartConstant[]): number {
        var cost = 0;
        for (const iterator of body) {
            if(iterator in BODYPART_COST) {
                cost += BODYPART_COST[iterator];
            }
        }
        return cost;
    }

}

export {LocalSpawn};