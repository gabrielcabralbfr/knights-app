var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var knightSchema = new Schema({
    name: String,
    nickname: String,
    birthday: Date,
    weapons: [
        {
            name: String,
            mod: Number,
            attr: Object,
            equipped: Boolean
        }
    ],
    attributes: {
        strength: Number,
        dexterity: Number,
        constitution: Number,
        intelligence: Number,
        wisdom: Number,
        charisma: Number,
    },
    keyAttribute: String
});

knightSchema.virtual("age")
    .get(function () {
        // Calculating age based on birthday
        let today = new Date()

        // Getting age difference
        let age = today.getFullYear() - this.birthday.getFullYear()

        // If birthday from current year didn't happen yet, subtract a year
        let month = today.getMonth() - this.birthday.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < this.birthday.getDate())) age--

        return age
    })

knightSchema.virtual("exp")
    .get(function () {
        if (this.age < 7) return 0
        return Math.floor((this.age - 7) * Math.pow(22, 1.45))
    })

knightSchema.virtual("attack")
    .get(function () {
        // Using ES6 Destructuring to get the key attribute value from attributes and assigning it to a variable
        const { [this.keyAttribute]: keyAttributeValue } = this.attributes

        // Getting equipped weeapon, since filter method returns an Array, pop method is needed
        const equippedWeapon = this.weapons.filter(weapon => weapon.equipped).pop()

        const attack = 10 + mod(keyAttributeValue) + equippedWeapon.mod
        return attack
    })

const mod = (value) => {
    if (value >= 0 && value <= 8) return -2
    if (value >= 9 && value <= 10) return -1
    if (value >= 11 && value <= 12) return 0
    if (value >= 13 && value <= 15) return +1
    if (value >= 16 && value <= 18) return +2
    if (value >= 19 && value <= 20) return +3

    return 0
}

module.exports = { Knight: mongoose.model("Knight", knightSchema) }