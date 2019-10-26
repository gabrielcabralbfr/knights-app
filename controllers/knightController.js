const { Knight } = require("../models/Knight")
module.exports = {
    getAll: ({ res, query }) => {
        let queryString = query.filter == 'heroes' ? { hallOfHeroes: true } : query 
        query.hallOfHeroes = false
        Knight.find(queryString, function (err, knights) {
            if (err) return res.send(err)

            let knightsList = []

            knights.map(knight => {
                let tempKnight = {
                    Nome: knight.name,
                    Idade: knight.age,
                    Armas: knight.weapons.length,
                    Atributo: knight.keyAttribute,
                    Ataque: knight.attack,
                    Exp: knight.exp
                }
                knightsList.push(tempKnight)
            })
            return res.send(knightsList)
        })
    },
    saveKnight: ({ body, res }) => {
        var knight = new Knight(body)

        knight.save(function (err) {
            if (err) return res.status(400).send(err)
            res.send(knight);
        })
    },
    getById: ({ params, res }) => {
        Knight.findById(params.knightId, function (err, knight) {
            if (err) return res.status(400).send(err)
            res.send(knight)
        })
    },
    deleteById: ({ params, res }) => {
        Knight.findOneAndUpdate({ _id: params.knightId }, { hallOfHeroes: true }, function (err, knight) {
            if (err) return res.status(400).send(err)
            res.send(knight)
        })
    },
    updateKnight: ({ params, res, body }) => {
        if (!body.nickname) res.status(400).send({ error: "Missing nickname property" })
        Knight.findOneAndUpdate({ _id: params.knightId }, { nickname: body.nickname }, function (err, knight) {
            if (err) return res.status(400).send(err)
            res.send(knight)
        })
    }
}