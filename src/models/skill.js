const db = require('../database');

const selectOneSkill = async (id) => {
    return await db('skill').select().where({ id });
}

const selectSkills = async () => {
    return await db('skill').select();
}

const insertSkills = async (content) => {
    await db('skill').insert(content);
}

const updateSkills = async (id, content) => {
    await db('skill').update(content).where({ id });
}

const deleteSkills = async (id) => {
    await db('skill').delete().where({ id });
}

module.exports = {
    selectOneSkill,
    selectSkills,
    insertSkills,
    updateSkills,
    deleteSkills
}