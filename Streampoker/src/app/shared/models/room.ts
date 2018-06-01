export class Room {
    uid: string;
    key: string;
    name: string;
    ownerId: string;

    constructor (ownerId: string, uid: string, key: string, name: string) {
        this.ownerId = ownerId;
        this.uid = uid;
        this.key = key;
        this.name = name;
    }
}
