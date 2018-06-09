import { Guest } from './guest';

export class Room {
    uid: string;
    key: string;
    name: string;
    ownerId: string;
    guests: Guest[];

    constructor (ownerId: string, uid: string, key: string, name: string, guests: Guest[]) {
        this.ownerId = ownerId;
        this.uid = uid;
        this.key = key;
        this.name = name;
        this.guests = guests;
    }
}
