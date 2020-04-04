
declare namespace NodeJS {
	interface Global {
        isMounted: boolean;
        needInit: boolean;
        simplex: I_Simplex;


        sayHello(content: string): void;
    }
}

interface Memory {
    Simplex: string;
}

interface CreepMemory {
    role: CreepType;
    colony: string;
    state: CreepState;
}



interface I_Simplex {
    colonys: Array<I_Colony>;

    
    run(): void;

    hasColony(name: string): number|undefined;
}




declare enum ColonyType {
    BASIC_COLONY = 1,
}

interface I_Colony {
    name: string;
    type: ColonyType;
    creeps: Array<I_Creeps>|undefined;
    structures: Array<I_Structures>|undefined;


    run(): void;

    getName(): string;

    creepGarbage(name: string): void;
    structureGarbage(name: string): void;
}




declare enum CreepType {
    QUEEN = 1,
}

declare enum CreepState {
    HAVEST = 1,
    TRANSFER,
    BUILD,
}

interface I_Creeps {
    name: string;
    colony: string;


    run(colonyHandle: I_Colony): void;
}





interface I_Structures {
    id: string;


    run(colonyHandle: I_Colony): void;
}

interface I_SpawnCreep {
    name: string;
    body: BodyPartConstant[];
    opt?: any;
}
