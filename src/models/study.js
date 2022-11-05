const db = require('../database');

const selectOneStudy = async (id) => {
    return await db('study').select().where({ id });
}

const selectStudies = async () => {
    return await db('study').select();
}

const insertStudies = async (content) => {
    await db('study').insert(content);
}

const updateStudies = async (id, content) => {
    await db('study').update(content).where({ id });
}

const deleteStudies = async (id) => {
    await db('study').delete().where({ id });
}

module.exports = {
    selectOneStudy,
    selectStudies,
    insertStudies,
    updateStudies,
    deleteStudies
}