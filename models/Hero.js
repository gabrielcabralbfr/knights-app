var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaOptions = {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  };
var heroSchema = new Schema({
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
}, schemaOptions);

module.exports = { Hero: mongoose.model("Hero", heroSchema) }
