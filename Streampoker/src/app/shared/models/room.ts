export class Room {
    uid: string;
    key: string;
    name: string;

    constructor (uid: string, key: string, name: string) {
        this.uid = uid;
        this.key = key;
        this.name = name;
    }
}
