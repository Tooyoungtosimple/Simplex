
function sayHello(name : String): void {
    console.log("Hello " + name + "!");
}


function mount(): void {
    if(!global.isMounted) {
        global.isMounted = true;

        global.sayHello = sayHello;
    }
}


export {mount};