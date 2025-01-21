import prisma from '../prisma-client.js';

export async function createNewRegister(req, res) {
    const { params, table } = req.body;

    if (!params || !table) {
        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    try {
        const newRegister = await prisma[table].create({ data: params });
        res.status(201).json({ message: 'Registro criado com sucesso', data: newRegister });
    } catch (error) {
        console.error('Erro ao criar registro:', error);
        res.status(500).json({ error: 'Erro interno do servidor', message: error.message });
    }
}

export async function getAllRegisters(req, res) {
    const { table } = req.params;
    const allowedTables = ['casa']; // colocar as outras dps
    if (!allowedTables.includes(table)) {
        return res.status(400).json({ error: 'Tabela inválida' });
    }
    try {
        const registers = await prisma[table].findMany({ where: { ativo: true } });
        res.status(200).json({ data: registers });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export async function getRegisterById(req, res) {
    const { id, table } = req.params;
    const allowedTables = ['casa']; // replace with your actual table names
    if (!allowedTables.includes(table)) {
        return res.status(400).json({ error: 'Tabela inválida' });
    }
    if (!id) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    try {
        const register = await prisma[table].findUnique({ where: { idcasa: Number(id), ativo: true } });
        if (!register) {
            return res.status(404).json({ error: 'Registro não encontrado' });
        }
        res.status(200).json({ data: register });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export async function updateRegister(req, res) {
    const { params } = req.body;
    const { id, table } = req.params;
    const allowedTables = ['casa']; // replace with your actual table names
    if (!id || !params || !table || !allowedTables.includes(table)) {
        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }
    try {
        const updatedRegister = await prisma[table].update({ where: { idcasa: Number(id), ativo: true }, data: params });
        res.status(200).json({ message: 'Registro atualizado com sucesso', data: updatedRegister });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor', msg: error.message });
    }
}

export async function deleteRegister(req, res) {
    const { id, table } = req.params;
    const allowedTables = ['casa']; 
    if (!id || !table || !allowedTables.includes(table)) {
        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }
    try {
        await prisma[table].update({ where: { idcasa: Number(id) }, data: { ativo: false } });
        res.status(200).json({ message: 'Registro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor', error: error.message });
    }
}