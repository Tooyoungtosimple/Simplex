import {ColonyBuilder} from "./colony/colonybuilder";

class Simplex implements I_Simplex {
    public colonys: Array<I_Colony> = new Array<I_Colony>();

    constructor(buider: any) {
        if(buider) {
            buider.forEach((element: any) => {
                var obj: any = new ColonyBuilder().withColonyInf(element).build();
                if(obj) this.colonys.push(obj);
            });
        } else {
            var obj: any = new ColonyBuilder().build();
            if(obj) this.colonys.push(obj);
        }
    }

    hasColony(name: string): number | undefined {
        for (var i=0;i<this.colonys.length;i++) {
            if(name === this.colonys[i].getName()) {
                return i;
            }
        }
        return undefined;
    }

    run(): void {
        for (const iterator of this.colonys) {
            iterator.run();
        }
    }

}

export {Simplex};