class OriginStructure implements I_Structures {
    id: string;

    constructor(id: string) {
        this.id = id;
    }

    run(colonyHandle: I_Colony): void {
        if(Game.getObjectById(this.id) === undefined) {
            colonyHandle.structureGarbage(this.id);
        }
    }
    
}