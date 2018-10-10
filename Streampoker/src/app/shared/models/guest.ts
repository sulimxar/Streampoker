export class Guest {
    uid: string;
    name: string;
    mark: string;
    ping: number;
    isInactive: boolean;

    constructor (uid: string, name: string, mark: string, ping: number) {
        this.uid = uid;
        this.name = name;
        this.mark = mark;
        this.ping = ping;
    }
}
