import { Guest } from './guest';
import { History } from './history';

export class Room {
    uid: string;
    key: string;
    name: string;
    ownerId: string;
    ping: number;
    guests: Guest[];
    history: History;

    constructor (ownerId: string, uid: string, key: string, name: string, ping: number, guests: Guest[], history: History) {
        this.ownerId = ownerId;
        this.uid = uid;
        this.key = key;
        this.name = name;
        this.ping = ping;
        this.guests = guests;
        this.history = history;
    }
}
