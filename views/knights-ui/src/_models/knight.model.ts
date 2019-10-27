export class Knight {
    public name: string;
    public nickname: string;
    public birthday: Date;
    public weapons: Array<Object>;
    public attributes: Object;
    public keyAttribute: string;

    constructor(name: string) {
        this.name = name
    }
}