import {LocalSpawn} from "./structurespawn";


class StructureBuilder {
    private id: string;

    constructor() {
        this.id = "";
    }
    /**
     * withInf
     */
    public withInf(inf: I_Structures) {
        if(inf) this.id = inf.id;
        
        return this;
    }

    /**
     * build
     */
    public build(): I_Structures|undefined {
        const obj = Game.getObjectById(this.id);

        switch(obj) {
            case STRUCTURE_SPAWN:
                return new LocalSpawn(this.id);
            case undefined:
                return undefined;
            default:
                return undefined;
        }
    }
}

export {StructureBuilder};