const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/accounts', async(req, res) => {
    try {
        const accounts = await db('accounts').   orderBy('id', 'DESC').limit(req.query.limit || 100);
        return res.json(accounts)
    } catch(err) {
        return res.json({error: err.message});
    }
});

server.post('/accounts', async(req, res) => {
    const {name, budget} = req.body;
    try {
        const newAccount = await db('accounts').insert({name: name, budget: budget});
        return res.json(newAccount);
    } catch(err) {
        return res.json({error: err.message});
    }
});

server.put('/accounts/:id', async(req, res) => {
    const {id} = req.params;
    const {name, budget} = req.body;
    try {
        const updatedCount = await db('accounts').where({id}).update({name: name, budget: budget});
        return res.json(updatedCount);
    } catch(err) {
        return res.json({error: err.message});
    }
});

server.delete('/accounts/:id', async(req, res) => {
    const {id} = req.params;
    
    try {
        const deletedCount = await db('accounts').where('id', id).del();
        return res.json(deletedCount);
    } catch(err) {
        return res.json({error: err.message});
    }
});

module.exports = server;