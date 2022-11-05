const db = require('../database');

const selectOneProject = async (id) => {
    return await db('project').select().where({ id });
}

const selectProjects = async () => {
    return await db('project').select();
}

const insertProjects = async (content) => {
    await db('project').insert(content);
}

const updateProjects = async (id, content) => {
    await db('project').update(content).where({ id });
}

const deleteProjects = async (id) => {
    await db('project').delete().where({ id });
}

module.exports = {
    selectOneProject,
    selectProjects,
    insertProjects,
    updateProjects,
    deleteProjects
}