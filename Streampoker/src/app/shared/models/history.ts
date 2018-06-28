import { Mark } from './mark';

export class History {
    summary: string;
    marks: Mark[];

    constructor (summary: string, marks: Mark[]) {
        this.summary = summary;
        this.marks = marks;
    }
}
