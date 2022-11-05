const db = require('../database');

const login = async (email, password) => {
    return await db('user').select().where({
        email: email,
        password: password
    });
}

const selectAccount = async (id) => {
    return await db('user').select().where({ id });
}

const updateAccount = async (id, content) => {
    await db('user').update(content).where({ id });
}

module.exports = {
    login,
    selectAccount,
    updateAccount
};