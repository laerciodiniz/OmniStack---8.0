const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [ //condicional que faz que todos os filtros sejam verdairos
                { _id: { $ne: user } }, //buscar usuarios onde o id é negado como id do usuario logado
                { _id: { $nin: loggedDev.likes } }, //Busca os Id's que não estão na lista q não tiveram likes
                { _id: { $nin: loggedDev.dislikes } }, //Busca os Id's que não estão na lista q não tiveram dislikes
            ],
        })

        return res.json(users);
    },
    
    async store(req, res) {
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if (userExists) {
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({ 
            name,
            user: username,
            bio,
            avatar
         })

        return res.json(dev);
    }
};