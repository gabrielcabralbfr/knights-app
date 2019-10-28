import { Weapon } from './weapon.model';

export class Knight {
    public name: string;
    public nickname: string;
    public birthday: Date;
    public weapons: Array<Weapon>;
    public attributes: Object;
    public keyAttribute: string;

    constructor(name: string) {
        this.name = name
        this.attributes = {}
    }
}