

class Queue<T> {
    private data: Array<T> = new Array<T>();
    
    /**
     * push
     */
    public push(iterate: T): void {
        this.data.push(iterate);
    }

    /**
     * shift
     */
    public shift(): T | undefined {
        return this.data.shift();
    }

    /**
     * length
     */
    public length(): number {
        return this.data.length;
    }
}