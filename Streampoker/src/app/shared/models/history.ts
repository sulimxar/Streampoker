import { Mark } from './mark';

export class History {
    summary: string;
    dateTime: number;
    marks: Mark[];

    constructor (summary: string, dateTime: number, marks: Mark[]) {
        this.summary = summary;
        this.dateTime = dateTime;
        this.marks = marks;
    }
}
