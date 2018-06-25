import { Guest } from './guest';

export class Room {
    uid: string;
    key: string;
    name: string;
    ownerId: string;
    ping: number;
    guests: Guest[];

    constructor (ownerId: string, uid: string, key: string, name: string, ping: number, guests: Guest[]) {
        this.ownerId = ownerId;
        this.uid = uid;
        this.key = key;
        this.name = name;
        this.ping = ping;
        this.guests = guests;
    }
}
