import {Queen} from "./Queen";

class CreepBuilder {
    private name: string | undefined;
    private colony: string | undefined;

    /**
     * withInf
     */
    public withInf(inf: I_Creeps): CreepBuilder {
        if(inf) {
            this.name = inf.name;
            this.colony = inf.colony;
        }
        return this;
    }

    /**
     * build
     */
    public build(): I_Creeps|undefined {
        if(this.name && this.colony && this.colony in Game.rooms) {
            switch(Game.creeps[this.name].memory.role) {
                case CreepType.QUEEN:
                    return new Queen({
                        name: this.name,
                        colony: this.colony
                    });
                case undefined:
                    return new Queen({
                        name: this.name,
                        colony: this.colony
                    });
            }
        } else {
            return undefined;
        }
    }
}

export {CreepBuilder};