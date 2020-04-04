import { BasicColony } from "./basiccolony";


class ColonyBuilder{
    private colonyInf: any = undefined;

    /**
     * withColonyType
     */
    public withColonyInf(colonyInf: any): ColonyBuilder {
        this.colonyInf = colonyInf;
        return this;
    }

    /**
     * build
     */
    public build(): I_Colony|undefined {
        if(this.colonyInf) {
            switch(this.colonyInf.type) {
                case ColonyType.BASIC_COLONY:
                    return new BasicColony(this.colonyInf);
                case undefined:
                    return new BasicColony(this.colonyInf);
            }
        }

        var validRoom: string = "";
        for (const key in Game.rooms) {
            if (Game.rooms.hasOwnProperty(key)) {
                if(!global.simplex.hasColony(key)) {
                    validRoom = key;
                    this.colonyInf = {
                        name: validRoom,
                        type: ColonyType.BASIC_COLONY,
                        creeps: undefined,
                        structures: undefined
                    }
                    return new BasicColony(this.colonyInf);
                }
            }
        }

        return undefined;
    }
}

export {ColonyBuilder};